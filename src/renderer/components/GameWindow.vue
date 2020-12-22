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
        <el-button @click="handleBlow" round
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
        v-if="expStart && showNextBalloon && outOfBalloon"
        class="game__start__controller"
      >
        <el-button @click="handleClickNextExp" icon="el-icon-right" round
          >本局气球已结束，进入下一场</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { shuffleArray } from "../utils/ArrayUtil";

const BALLOON_SCALE_INCREASE = 0.1; //TODO: currently maximum blow will need to be limited to approx 30

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
    };
  },
  computed: {
    unit() {
      return this.expSettingList[this.currentExp].unit;
    },
    scorePerBlow() {
      return this.expSettingList[this.currentExp].scorePerBlow;
    },
    maxBlow() {
      return this.balloons[this.currentBalloon];
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
      return this.currentExp > this.expSettingList.length - 1;
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
    handleBlow() {
      if (++this.blow >= this.maxBlow) {
        this.resetRoundScore();
        this.balloonExplode();
        return;
      }
      this.updateScore();
    },

    handleClickOk() {
      if (this.blow === 0) {
        this.$message({
          message: "请至少吹一次哦～",
          type: "warning",
        });
        return;
      }
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

    updateScore() {
      this.score = this.score + this.scorePerBlow;
      this.totalScore = this.totalScore + this.scorePerBlow;
    },

    resetRoundScore() {
      const totalScore =
        this.totalScore - this.scorePerBlow * (this.maxBlow - 1);
      this.score = 0;
      this.totalScore = totalScore >= 0 ? totalScore : 0;
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
        balloons = balloons.concat(Array(count).fill(maxBlow));
      }
      return shuffleArray(balloons);
    },
  },
  created() {},
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
}
</style>
