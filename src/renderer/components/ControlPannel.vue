<template>
  <div class="pannel">
    <el-card shadow="hover">
      <div class="container">
        <div style="height: 200px;">
          <el-steps direction="vertical" :active="0">
            <el-step
              title="虚拟分数"
              description="游戏奖励为虚拟分数。"
            ></el-step>
            <el-step
              title="金钱奖励"
              description="游戏奖励为现金，加油！"
            ></el-step>
            <el-step title="保存数据" description="保存实验数据。"></el-step>
          </el-steps>
        </div>
        <div class="container__controller">
          <el-button type="success" icon="el-icon-bottom" round
            >进入下一步
          </el-button>
          <el-button type="danger" icon="el-icon-top" round>返回</el-button>
        </div>
        <div class="container__setting">
          <el-link type="info"
            ><i class="el-icon-s-tools"></i> 测试选项</el-link
          >
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ControlPannel",
};
</script>

<style lang="scss" scoped>
.pannel {
  width: 30vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container {
  height: 90vh;
  width: 25vw;
  &__controller {
    margin-top: 20px;
    width: 100%;
    display: flex;
    align-items: center;
  }
  &__setting {
    width: 100%;
    margin-top: 210px;
    display: flex;
    justify-content: center;
  }
}
</style>
