<template>
  <div class="home">
    <div class="home__main">
      <game-window></game-window>
    </div>
    <div class="home__side">
      <control-pannel></control-pannel>
    </div>
  </div>
</template>

<script>
import GameWindow from "@/components/GameWindow";
import ControlPannel from "@/components/ControlPannel";

export default {
  name: "HomePage",
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
