<template>
  <div
    class="justify-center flex flex-col items-center h-screen"
    :class="` bg-${color.four} text-${color.six}`"
  >
  <router-link to="/lobby">
  <div @click="goOnline" class="absolute top-[5px] right-[12px]">Online Multiplayer</div>
  </router-link>
    <img
      src="/logo.svg"
      :style="styleImg"
      alt=""
    />
    <!-- <div></div> -->
    <div
      class="bg-white w-[504px] rounded-[20px] p-[48px] sm:w-[85vw] sm:p-[30px]"
    >
      <Option :header="'Select Theme'" :content="themes" />
      <Option :header="'Numbers of Players'" :content="players" />
      <Option :header="'Grid Size'" :content="grid" />
      <router-link to="/game">
        <div
          class="
            cursor-pointer
            text-white text-2xl
            flex
            justify-center
            items-center
            h-[52px]
            rounded-[26px]
            sm:h-[45px] sm:mt-[10px]
          "
          :class="` bg-${color.one} hover:bg-${color.nine}`"
        >
          Start Game
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import Option from "../components/Option.vue";
import store from "../store";

export default {
  data() {
    return {
      themes: ["Numbers", "Icons"],
      players: 4,
      grid: ["4x4", "6x6"],
      styleImg: {
        filter:
          'invert(99%) sepia(22%) saturate(2%) hue-rotate(273deg) brightness(113%) contrast(100%)',
        marginBottom: '20px',
        objectFit: 'none',
      },
    };
  },
  computed: {
    color() {
      return this.$store.state.color;
    },
  },
  methods: {
    changeTheme() {
      return this.$store.dispatch("changeTheme");
    },
    goOnline() {
      let header = 'Numbers of Players'
      let item = 2
      store.commit("changeSettings", { header, item });
    },
  },
  components: { Option },
};
</script>

<style></style>
