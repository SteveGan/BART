<template>
  <div class="home">
    <div class="home__main">
      <game-window
        v-if="hasSetting"
        :start="start"
        :exp-name="expName"
        :exp-introduction="expIntroduction"
        :exp-setting-list="expSettingList"
        :current-exp="currentExp"
        @gameStart="handleGameStart"
        @nextExp="handleNextExp"
      ></game-window>
    </div>
    <div class="home__side">
      <control-pannel
        :has-setting="hasSetting"
        :start="start"
        :exp-name="expName"
        :exp-introduction="expIntroduction"
        :exp-setting-list="expSettingList"
        :current-exp="currentExp"
      ></control-pannel>
    </div>
  </div>
</template>

<script>
import GameWindow from "@/components/GameWindow";
import ControlPannel from "@/components/ControlPannel";
import { mapState } from "vuex";

export default {
  name: "HomePage",
  data() {
    return {
      start: false,
      currentExp: 0,
    };
  },
  computed: {
    ...mapState({
      expName: (state) => state.preference.expName,
      expIntroduction: (state) => state.preference.expIntroduction,
      expSettingList: (state) => state.preference.expSettingList,
    }),
    hasSetting() {
      return this.expSettingList.length > 0;
    },
  },
  methods: {
    handleGameStart() {
      this.start = true;
    },
    handleNextExp() {
      this.currentExp++;
    },
  },
  components: {
    "game-window": GameWindow,
    "control-pannel": ControlPannel,
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ghostwhite;
  overflow: hidden;
}
</style>
