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
        >开始游戏</el-button
      >
    </div>
    <div v-if="start" class="game__start">
      <div class="game__start__top">
        <div class="game__start__top__score">
          <div>累计分数： 2342</div>
          <div>剩余气球： 21/30</div>
          <div class="game__start__top__score__restart">
            <el-link type="info" class="link"
              >重新开始 <i class="el-icon-refresh-left"></i
            ></el-link>
          </div>
        </div>
      </div>
      <div class="game__start__balloon">
        <img src="../assets/red-balloon.png" alt="Picture of balloon" />
        <div>800$</div>
      </div>
      <div class="game__start__controller">
        <el-button round>吹气球 + 400$</el-button>
        <el-button icon="el-icon-check" round>OK</el-button>
      </div>
    </div>
  </div>
</template>

<script>
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
  },
  methods: {
    handleClickStart() {
      this.$emit("gameStart");
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
