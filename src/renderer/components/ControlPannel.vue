<template>
  <div class="pannel">
    <el-card v-if="hasSetting" shadow="hover">
      <div class="container">
        <div class="container__title">{{ expName }}</div>
        <div style="height: 200px;">
          <el-steps direction="vertical" :active="0">
            <el-step
              v-for="(exp, index) in expSettingList"
              :key="index"
              :title="exp.title"
              :description="exp.description"
            ></el-step>
          </el-steps>
        </div>
        <div class="container__controller">
          <el-button
            type="success"
            icon="el-icon-bottom"
            :disabled="!start"
            round
            >进入下一步
          </el-button>
          <el-button type="danger" icon="el-icon-top" :disabled="!start" round
            >返回</el-button
          >
        </div>
        <div class="container__setting">
          <el-link type="info" @click="handleClickPreference"
            ><i class="el-icon-s-operation"></i> 测试选项</el-link
          >
        </div>
      </div>
    </el-card>
    <div v-if="!hasSetting" class="no-setting">
      <el-link type="info" @click="handleClickPreference"
        ><i class="el-icon-s-operation"></i> 设置测试选项</el-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "ControlPannel",
  props: {
    hasSetting: {
      type: Boolean,
      required: true,
    },
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
  created() {},
  methods: {
    handleClickPreference() {
      this.$ipc.send("openPreference");
    },
  },
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
  &__title {
    width: 100%;
    display: flex;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 10px;
  }
  &__controller {
    margin-top: 20px;
    width: 100%;
    display: flex;
    align-items: center;
  }
  &__setting {
    width: 100%;
    margin-top: 200px;
    display: flex;
    justify-content: center;
  }
}

.no-setting {
  font-size: 40px;
}
</style>
