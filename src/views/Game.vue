<template>
  <div
    :class="`justify-center flex-col flex bg-${color.ten} text-${color.six} items-center h-screen`"
  >
    <router-link to="/">
      <div
        :class="`flex 
        text-2xl cursor-pointer 
        mb-[27px] mt-[14px] text-dblue 
        justify-center rounded-[26px] 
        items-center h-[52px] 
        w-[256px] bg-${color.eight} 
        hover:bg-${color.seven}`"
      >
        New Game
      </div>
    </router-link>
    <div class="w-[570px] bg-blue" style="column-count: 6">
      <div class="mb-[10px]" v-for="item in shuffle" :key="item">
        <div
          :class="`flex text-white justify-center items-center w-[82px] h-[82px]  rounded-full bg-${color.four}`"
        >
          <!-- {{item}} -->
          <img
            class="w-[50%]"
            :src="`${icons[item]}`"
            style="
              filter: invert(99%) sepia(22%) saturate(2%) hue-rotate(273deg)
                brightness(113%) contrast(100%);
            "
            alt=""
          />
        </div>
      </div>
    </div>
    {{}}
  </div>
</template>

<script>
import { icons, numbers } from "../components/data";

export default {
  data() {
    return {
      players: 4,
      grid: ["4x4", "6x6"],
      icons,
    };
  },
  computed: {
    color() {
      return this.$store.state.color;
    },
    set() {
      return this.$store.state.setting;
    },
    shuffle() {
      const array = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
      ];
      let m = array.length,
        t,
        i;
      while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }
      return array;
    },
  },
  methods: {
    changeTheme() {
      return this.$store.dispatch("changeTheme");
    },
    setImage(image) {
      return require(`${image}`);
    },
  },
  components: { Option },
};
</script>

<style>
.me {
  cursor: pointer;
}
</style>
