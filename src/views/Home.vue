<template>
  <div
    :class="`justify-center flex bg-${color.four} text-${color.six} items-center h-screen`"
  >
    <div class="bg-white w-[654px] rounded-[20px] p-[56px] ">

      <Option :header="'Select Theme'" :content="themes" />
      <Option :header="'Numbers of Players'" :content="players" />
      <Option :header="'Grid Size'" :content="grid" />

      <div :class="`cursor-pointer text-white text-2xl flex justify-center items-center h-[52px] rounded-[26px] bg-${color.one} hover:bg-${color.nine}`">Start Game</div>
    </div>
    <router-link to="/game">About</router-link>
  </div>
</template>

<script>
import Option from "../components/Option.vue"

export default {
    data() {
        return {
            themes: ["Numbers", "Icons"],
            players: 4,
            grid: ["4x4", "6x6"],
        };
    },
    computed: {
        color() {
            return this.$store.state.color;
        },
        set() {
            return this.$store.state.setting;
        },
    },
    methods: {
        changeTheme() {
            return this.$store.dispatch("changeTheme");
        },
    },
    components: { Option }
};
</script>

<style>
.me {
  cursor: pointer;
}
</style>
