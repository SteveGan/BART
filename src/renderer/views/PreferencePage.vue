<template>
  <div class="container">
    <div class="header">
      <div class="header__title">
        <i class="el-icon-s-operation"></i> 测试选项
      </div>
      <el-link :underline="false" @click="handleClickClose">
        <div class="header__close-button">
          <i class="el-icon-close"></i>
        </div>
      </el-link>
    </div>
    <div class="main">
      <div class="main__block" v-for="(exp, index) in exps" :key="index">
        <div class="main__block__title">
          实验 1
        </div>
        <div class="main__form">
          <el-form
            v-for="(exp, index) in exps"
            :key="index"
            ref="exps"
            :model="exp"
            label-width="100px"
            label-position="right"
            size="mini"
          >
            <el-form-item prop="title" label="实验标题">
              <el-input v-model="exp.title"></el-input>
            </el-form-item>
            <el-form-item prop="description" label="过程描述">
              <el-input
                type="textarea"
                :rows="5"
                v-model="exp.description"
              ></el-input>
            </el-form-item>
            <el-form-item prop="scorePerBlow" label="单次吹气分数">
              <div style="text-align:left; display: flex;">
                <el-input-number
                  v-model="exp.scorePerBlow"
                  :min="0"
                  :step="10"
                  :precision="0"
                ></el-input-number>
                <div class="div" style="width: 100px; margin-left: 10px;">
                  <el-select v-model="exp.unit" placeholder="单位">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </el-form-item>
            <el-form-item
              v-for="(balloon, index) in exp.balloons"
              :key="index"
              :prop="`balloons.${index}`"
              :label="`气球-${index + 1}`"
            >
              <div class="main__form__row">
                <div class="main__form__row__col">上限：</div>
                <el-input-number
                  v-model="balloon.maxBlow"
                  controls-position="right"
                  @change="handleChange"
                  :min="1"
                  :precision="0"
                ></el-input-number>
                <div class="main__form__row__col">个数：</div>
                <el-input-number
                  v-model="balloon.count"
                  controls-position="right"
                  @change="handleChange"
                  :min="1"
                  :precision="0"
                ></el-input-number>
                <div class="main__form__row__col">
                  <el-button>删除</el-button>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button
                @click="addDomain"
                icon="el-icon-plus"
                round
                style="display: flex;"
              >
                新增气球
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="main__new-exp">
        <el-button round>添加实验</el-button>
        <el-button type="primary" round>保存设置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PreferencePage",
  data() {
    return {
      exps: [
        {
          title: "",
          description: "",
          scorePerBlow: 0,
          unit: "",
          balloons: [
            {
              maxBlow: 0,
              count: 0,
            },
          ],
        },
      ],
      options: [
        {
          value: "yuan",
          label: "¥",
        },
        {
          value: "score",
          label: "分",
        },
      ],
    };
  },
  methods: {
    handleClickClose() {
      this.$ipc.send("closePreference");
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  width: 100vw;
  &:-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.header {
  position: fixed;
  width: 600px;
  background-color: white;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 5px 10px 0 30px;
  color: dodgerblue;
  z-index: 5;

  &__close-button {
    font-size: 30px;
    margin-right: 50px;
  }
  &__title {
    margin-right: auto;
    font-size: 20px;
    font-weight: bold;
  }
}
.main {
  padding: 100px 30px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  &:-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &__block {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding-left: 50px;
    &__title {
      font-weight: bold;
      color: grey;
      font-size: 20px;
      margin-bottom: 10px;
      margin-left: 40px;
    }
  }
  &__form {
    width: 520px;
    &__row {
      width: 100%;
      display: flex;
      align-items: center;
      &__col {
        margin-left: 5px;
        display: flex;
        color: grey;
      }
    }
  }
  &__new-exp {
    width: 100%;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
