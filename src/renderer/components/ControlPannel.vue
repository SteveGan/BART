<template>
  <div class="pannel">
    <el-card v-if="hasSetting" shadow="hover">
      <div class="container">
        <div class="container__title">{{ expName }}</div>
        <div class="container__steps">
          <el-steps
            direction="vertical"
            :space="200"
            :active="currentExp"
            style="display: block;"
          >
            <el-step
              v-for="(exp, index) in expSettingList"
              :key="index"
              :title="exp.title"
              :description="exp.description"
            ></el-step>
          </el-steps>
        </div>
        <div v-if="currentExp > 0" class="container__restore">
          <el-button
            icon="el-icon-refresh-left"
            type="danger"
            @click="handleClickRestartAll"
            round
            >重新开始整个实验</el-button
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
    currentExp: {
      type: Number,
      required: true,
    },
  },
  created() {},
  methods: {
    handleClickPreference() {
      this.$ipc.send("openPreference");
    },
    handleClickRestartAll() {
      this.$confirm("重新开始所有实验步骤，记录将会被删除", "重新开始", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$emit("restartAll");
          this.$message({
            type: "success",
            message: "重新开始！",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "继续实验",
          });
        });
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
  &__steps {
    display: flex;
    flex-direction: column;
    overflow: scroll;
    height: 400px;
  }
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
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}

.no-setting {
  font-size: 40px;
}

/deep/ .el-step__main {
  padding-left: 10px;
  margin-bottom: 20px;
}
</style>
