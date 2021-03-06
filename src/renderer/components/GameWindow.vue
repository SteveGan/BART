<template>
  <div class="game">
    <div v-if="!start" class="game__prepare">
      <div class="game__prepare__title">{{ expName }}</div>
      <div class="game__prepare__intro">{{ expIntroduction }}</div>
      <el-button
        type="danger"
        style="font-size: 20px;"
        round
        @click="handleClickStart"
        >我已阅读并理解游戏流程</el-button
      >
    </div>
    <div v-if="start" class="game__start">
      <div v-if="expStart" class="game__start__top">
        <div class="game__start__top__score">
          <div>累计分数： {{ totalScore }} {{ unit }}</div>
          <div>
            剩余气球： {{ balloonLeft >= 0 ? balloonLeft : 0 }}/{{
              balloons.length
            }}
          </div>
          <div class="game__start__top__score__restart">
            <el-link type="info" class="link" @click="handleRestart"
              >重开本局 <i class="el-icon-refresh-left"></i
            ></el-link>
          </div>
        </div>
      </div>
      <div v-if="!expStart" class="game__start__top"></div>
      <div class="game__start__balloon">
        <img
          :src="balloonPic"
          alt="Picture of balloon"
          :style="`transform:scale(${balloonScale})`"
        />
        <div
          v-if="expStart && !showExplode && score"
          :style="`transform:scale(${balloonScale})`"
        >
          {{ score }}{{ unit }}
        </div>
      </div>
      <div v-if="!expStart" class="game__start__controller">
        <el-button @click="handleClickStartExp" type="danger" round
          >开始游戏</el-button
        >
      </div>
      <div v-if="expStart && !showNextBalloon" class="game__start__controller">
        <el-button @click="handleClickBlow" round
          >吹气球 + {{ scorePerBlow }}{{ unit }}</el-button
        >
        <el-button @click="handleClickOk" icon="el-icon-check" round
          >OK</el-button
        >
      </div>
      <div
        v-if="expStart && showNextBalloon && !outOfBalloon"
        class="game__start__controller"
      >
        <el-button
          @click="handleClickNext"
          icon="el-icon-right"
          type="success"
          round
          >去吹下个气球</el-button
        >
      </div>
      <div
        v-if="expStart && showNextBalloon && outOfBalloon && !outOfExps"
        class="game__start__controller"
      >
        <el-button @click="handleClickNextExp" icon="el-icon-right" round
          >本局气球已结束，进入下一场</el-button
        >
      </div>
      <div
        v-if="expStart && showNextBalloon && outOfBalloon && outOfExps"
        class="game__start__controller"
        type="success"
      >
        <el-button
          @click="handleClickExport"
          type="success"
          icon="el-icon-download"
          round
          :disabled="disableExport"
          >实验结束，点击按钮下载数据</el-button
        >
      </div>
      <div v-if="blow" class="prompt">{{ blow }}/128</div>
    </div>
  </div>
</template>

<script>
import { shuffleArray } from "../utils/ArrayUtil";

const fs = require("graceful-fs");
const { dialog } = require("electron").remote;
const BALLOON_SCALE_INCREASE = 0.022; //TODO: currently maximum blow will need to be limited to approx 30

export default {
  name: "GameWindow",
  props: {
    start: {
      type: Boolean,
      required: true,
    },
    expName: {
      type: String,
      required: true,
    },
    expIntroduction: {
      type: String,
      required: true,
    },
    expSettingList: {
      type: Array,
      required: true,
    },
    currentExp: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      records: [],
      //record after indexes denoted by each save points will be discarded in one reset
      recordsSavePoint: [],
      balloons: [],
      currentBalloon: 0,
      totalScore: 0,
      score: 0,
      blow: 0,
      expStart: false,
      showExplode: false,
      showNextBalloon: false,
      disableExport: false,
    };
  },
  computed: {
    unit() {
      return this.expSettingList[this.currentExp].unit;
    },
    scorePerBlow() {
      // return this.expSettingList[this.currentExp].scorePerBlow;
      return this.balloons[this.currentBalloon].scorePerBlow;
    },
    maxBlow() {
      return this.balloons[this.currentBalloon].maxBlow;
    },
    balloonPic() {
      return this.showExplode
        ? require("../assets/explode.png")
        : require("../assets/red-balloon.png");
    },
    balloonScale() {
      return 1 + BALLOON_SCALE_INCREASE * this.blow;
    },
    balloonLeft() {
      return this.balloons.length - this.currentBalloon - 1;
    },
    outOfBalloon() {
      return this.balloonLeft <= 0;
    },
    outOfExps() {
      return this.currentExp >= this.expSettingList.length - 1;
    },
  },
  watch: {
    currentExp: function(val) {
      this.balloons = this.createBalloons(
        this.expSettingList[this.currentExp].balloons
      );
      if (val === 0) {
        this.restartAll();
      }
      this.addRecordsSavePoint();
    },
  },
  methods: {
    handleClickStart() {
      this.$emit("gameStart");
    },

    handleClickStartExp() {
      this.expStart = true;
      this.startExp(this.expSettingList[this.currentExp]);
    },
    handleClickNext() {
      if (this.currentBalloon >= this.balloons.length) return;
      this.currentBalloon++;
      this.score = 0;
      this.blow = 0;
      this.showExplode = false;
      this.showNextBalloon = false;
      this.expStart = true;
    },
    handleClickNextExp() {
      if (this.currentExp >= this.expSettingList.length) return;
      this.resetStatus();
      this.$emit("nextExp");
    },
    handleClickExport() {
      this.disableExport = true;
      const csvData = this.jsonToCsv(this.records);
      dialog.showSaveDialog(
        {
          filters: [
            {
              name: "CSV files",
              extensions: ["csv"],
            },
          ],
        },
        (fileName) => {
          this.disableExport = false;
          if (fileName === undefined) {
            this.$message({
              message: "警告：数据未保存。",
              type: "warning",
            });
            return;
          }
          fs.writeFile(fileName, csvData, (err) => {
            if (err) {
              this.$message.error("数据存储发生异常，请重新尝试。");
            }
            this.$message({
              message: "数据保存成功。",
              type: "success",
            });
          });
        }
      );
    },
    handleClickBlow() {
      if (++this.blow >= this.maxBlow) {
        this.balloonExplode();
        this.resetRoundScore();
        return;
      }
      this.updateRoundScore();
    },

    handleClickOk() {
      if (this.blow === 0) {
        this.$message({
          message: "请至少吹一次哦～",
          type: "warning",
        });
        return;
      }
      this.updateScore();
      this.showNextBalloon = true;
      this.record();
    },

    handleRestart() {
      this.$confirm("重新开始本步骤的实验，记录将会被删除", "重新开始", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.restartExp();
          this.$message({
            type: "success",
            message: "重新开始！",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "继续游戏",
          });
        });
    },

    restartExp() {
      console.log(
        "before reset this.recordsSavePoint :>> ",
        this.recordsSavePoint
      );
      const lastResetPoint = this.recordsSavePoint.pop();
      console.log(
        "after reset this.recordsSavePoint :>> ",
        this.recordsSavePoint
      );
      console.log("before this.records :>> ", this.records);
      this.records = this.records.slice(0, lastResetPoint);
      console.log("after this.records :>> ", this.records);
      this.resetStatus();
    },

    startExp(currentExp) {
      this.balloons = this.createBalloons(currentExp.balloons);
      this.addRecordsSavePoint();
    },

    balloonExplode() {
      this.showExplode = true;
      this.showNextBalloon = true;
      this.record();
    },

    updateRoundScore() {
      this.score = this.score + this.scorePerBlow;
    },

    resetRoundScore() {
      this.score = 0;
    },

    updateScore() {
      this.totalScore = this.totalScore + this.score;
    },

    record() {
      const record = this.createRecord(
        this.scorePerBlow,
        this.maxBlow,
        this.blow,
        this.unit
      );
      this.records.push(record);
      console.log("this.records :>> ", this.records);
    },

    addRecordsSavePoint() {
      // no check point setted
      if (this.recordsSavePoint.length === 0) {
        this.recordsSavePoint.push(0);
        console.log(" init this.recordSavePoint :>> ", this.recordsSavePoint);
        return;
      }
      // num of records non changed sice last save point
      if (this.records.length - 1 === this.recordsSavePoint[-1]) {
        console.log("this.recordSavePoint :>> ", this.recordsSavePoint);
        return;
      }

      this.recordsSavePoint.push(this.records.length);
      console.log("this.recordSavePoint :>> ", this.recordsSavePoint);
    },

    resetStatus() {
      this.totalScore = 0;
      this.score = 0;
      this.currentBalloon = 0;
      this.blow = 0;
      this.showExplode = false;
      this.showNextBalloon = false;
    },

    restartAll() {
      this.resetStatus();
      this.records = [];
      this.recordsSavePoint = [];
    },

    buttonPressed(key) {
      console.log("key :>> ", key);
      // left and right arrow
      if (key === 39 || key === 37) {
        if (this.expStart && !this.showNextBalloon) this.handleClickBlow();
      }
      if (key === 32) {
        if (this.expStart && !this.showNextBalloon) {
          this.handleClickOk();
          return;
        }
        if (this.expStart && this.showNextBalloon && !this.outOfBalloon) {
          this.handleClickNext();
          return;
        }
        if (
          this.expStart &&
          this.showNextBalloon &&
          this.outOfBalloon &&
          !this.outOfExps
        ) {
          this.handleClickNextExp();
          return;
        }
      }
    },

    createRecord(scorePerBlow, maxBlow, blow, unit) {
      const now = new Date();
      const time = `${now.getFullYear()}-${now.getMonth() +
        1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      const score = blow < maxBlow ? scorePerBlow * blow : 0;
      return {
        time,
        scorePerBlow,
        maxBlow,
        blow,
        score,
        unit,
      };
    },

    createBalloons(balloonSetting) {
      let balloons = [];
      for (let i = 0; i < balloonSetting.length; i++) {
        const count = balloonSetting[i].count;
        const maxBlow = balloonSetting[i].maxBlow;
        const scorePerBlow = balloonSetting[i].scorePerBlow;
        balloons = balloons.concat(
          Array(count).fill({ maxBlow, scorePerBlow })
        );
      }
      return shuffleArray(balloons);
    },

    jsonToCsv(data) {
      const items = data;
      const replacer = (key, value) => (value === null ? "" : value); // specify how you want to handle null values here
      const header = Object.keys(items[0]);
      const csv = [
        header.join(","), // header row first
        ...items.map((row) =>
          header
            .map((fieldName) =>
              JSON.stringify(row[fieldName], "utf-8", replacer)
            )
            .join(",")
        ),
      ].join("\r\n");

      return csv;
    },
  },
  created() {
    window.addEventListener("keydown", (e) => {
      this.buttonPressed(e.keyCode);
    });
  },
};
</script>

<style lang="scss" scoped>
%window {
  width: 65vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px;
}
.game {
  &__prepare {
    @extend %window;
    justify-content: center;
    &__title {
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    &__intro {
      font-size: 20px;
      max-width: 400px;
      margin-bottom: 20px;
    }
  }
  &__start {
    @extend %window;

    &__top {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: flex-start;
      margin-top: 20px;
      height: 60px;
      &__score {
        display: flex;
        flex-direction: column;
        font-size: 20px;
        font-weight: 900;
        font-style: italic;
        color: grey;
        align-items: flex-start;
      }
    }
    &__balloon {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 350px;
      width: 350px;
      position: relative;
      img {
        height: 100px;
        width: 100px;
      }
      div {
        position: absolute;
        color: white;
        font-weight: 900;
        font-size: 20px;
      }
      &__restart {
        margin-top: 20px;
      }
    }
    &__controller {
      font-weight: bold;
    }
  }

  .prompt {
    margin-top: 10px;
    color: dimgrey;
  }
}
</style>
