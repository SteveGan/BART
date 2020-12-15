<template>
  <div class="game">
    <div class="game__top">
      <div class="game__top__score">
        <div>累计分数： 2342</div>
        <div>剩余气球： 21/30</div>
        <div class="game__top__score__restart">
          <el-link type="info" class="link"
            >重新开始 <i class="el-icon-refresh-left"></i
          ></el-link>
        </div>
      </div>
    </div>
    <div class="game__balloon">
      <img src="../assets/red-balloon.png" alt="Picture of balloon" />
      <div>800$</div>
    </div>
    <div class="game__controller">
      <el-button round>吹气球 + 400$</el-button>
      <el-button icon="el-icon-check" round>OK</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameWindow",
};
</script>

<style lang="scss" scoped>
.game {
  width: 65vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px;
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
</style>
