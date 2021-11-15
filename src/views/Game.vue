<template>
  <div
    class="justify-center flex-col flex items-center h-screen"
    :class="` bg-${color.ten} text-${color.six} `"
  >
    <div
      class="
        flex
        mb-[50px]
        absolute
        top-[5vh]
        w-[920px]
        justify-between
        md:w-[95vw]
      "
    >
    <div></div>
      <!-- <img class="object-none" src="logo.svg" alt="" /> -->
      <div class="flex">
        <div
          class="
            flex
            text-2xl
            cursor-pointer
            text-white
            justify-center
            rounded-[26px]
            items-center
            h-[52px]
            w-[130px]
            mm:h-[43px]
            sm:h-[38px] sm:w-[100px] sm:text-[20px] sm:hidden
          "
          :class="` bg-${color.one} 
        hover:bg-${color.nine}`"
          @click="restart"
        >
          Restart
        </div>
        <div
          class="
            flex
            text-2xl
            cursor-pointer
            text-dblue
            justify-center
            rounded-[26px]
            items-center
            h-[52px]
            w-[130px]
            mm:h-[43px]
            sm:h-[38px] sm:w-[100px] sm:text-[20px]
            lg:hidden
          "
          :class="` bg-${color.one} 
        hover:bg-${color.nine}`"
          @click="restart"
        >
          Menu
        </div>
        <router-link to="/">
          <div
            class="
              ml-[20px]
              flex
              text-2xl
              cursor-pointer
              text-dblue
              justify-center
              rounded-[26px]
              items-center
              h-[52px]
              w-[170px]
              mm:h-[43px]
              sm:hidden
            "
            :class="` bg-${color.eight} 
        hover:bg-${color.seven}`"
          >
            New Game
          </div>
        </router-link>
      </div>
    </div>
    <div :style="{ columnCount: `${gridSize}` }" class="relative">
      <div class="mb-[10px]" v-for="item in array" :key="item">
        <div
          class="
            flex
            text-white
            justify-center
            items-center
            text-[40px]
            rounded-full
            cursor-pointer
          "
          :class="`${
            click[item].state && !found[item]
              ? `bg-${color.one}`
              : `${
                  !found[item]
                    ? `bg-${color.four} hover:bg-${color.seven}`
                    : `bg-${color.two}`
                }`
          } ${
            gridSize === 4
              ? 'w-[10vh] h-[10vh] sm:w-[21vw] sm:h-[21vw]'
              : 'w-[7vh] h-[7vh] sm:w-[12vw] sm:h-[12vw]'
          }          `"
          @click="clicked(item)"
        >
          {{item}}
          <KeepAlive>
            <img
              v-show="
                (click[item].state || found[item]) &&
                set['Select Theme'] === 'Icons'
              "
              class="w-[50%]"
              :src="`${icons[item]}`"
              style="
                filter: invert(99%) sepia(22%) saturate(2%) hue-rotate(273deg)
                  brightness(113%) contrast(100%);
              "
              alt=""
            />
          </KeepAlive>
          <h1
            v-if="
              (click[item].state || found[item]) &&
              set['Select Theme'] === 'Numbers'
            "
          >
            {{ numbers[item] }}
          </h1>
        </div>
      </div>
      <!-- {{set['Numbers of Players']}} -->
      <!-- {{ item }} -->
      <div
        class="flex absolute mx-auto bottom-[-154px] -inset-x-0 justify-center"
      >
        <div
          class="flex flex-col items-center"
          v-for="(wins, player) in players"
          :key="player"
        >
          <div
            class="
              w-[200px]
              flex
              relative
              items-center
              rounded-[8px]
              p-[21px]
              m-[20px]
              h-[59px]
              justify-between
              md:w-[20vw]
              mm:m-[2vw] mm:flex-col mm:items-start mm:p-[7px] mm:h-full
              sm:items-center
            "
            :class="`${
              player == turn
                ? `bg-${color.one} text-${color.ten}`
                : `bg-${color.eight}`
            }`"
          >
            <div class="sm:hidden">Player {{ player }}</div>
            <div class="lg:hidden">P{{ player }}</div>

            <h2 class="text-2xl">{{ wins }}</h2>
            <div
              v-if="player == turn"
              class="
                transform
                rotate-45
                w-[20px]
                h-[20px]
                absolute
                mx-auto
                top-[-10px]
                -inset-x-0
              "
              :class="`bg-${color.one}`"
            ></div>
          </div>
          <div
            v-if="player == turn"
            class="text-[13px] tracking-[5px] mm:hidden"
            :class="`text-${color.four}`"
          >
            CURRENT TURN
          </div>
        </div>
      </div>
    </div>
  </div>
  <Results v-if="finish" :players="players" :restart="restart" />
</template>

<script>
import { numbers, icons } from "../components/data";
import { computed, h } from "vue";
import Results from "../components/Results.vue";
import usePlayerInit from "../composables/usePlayerInit";
import useShuffleGrid from "../composables/useShuffleGrid";

const HelloWorld = {
  render() {
    return h("div", [
      h("h1", { class: "bg-blue" }, "Hello world"),
      h("div", "somethign else"),
    ]);
  },
};

export default {
  setup() {
    const { players, playersNumb, initPlayer } = usePlayerInit();
    const { click, array, gridSize, initClick, shuffleGrid } = useShuffleGrid();
    return {
      players,
      playersNumb,
      array,
      gridSize,
      click,
      shuffleGrid,
      initClick,
      initPlayer,
    };
  },
  data() {
    return {
      numbers,
      icons,
      try: {},
      found: {},
      single: 0,
      turn: 1,
      allowed: true,
    };
  },
  computed: {
    finish() {
      return Object.keys(this.found).length === this.gridSize * this.gridSize;
    },
    color() {
      return this.$store.state.color;
    },
    set() {
      return this.$store.state.setting;
    },
  },
  methods: {
    restart() {
      this.turn = 1;
      this.single = 0;
      this.found = {};
      this.try = {};

      this.click = this.initClick();
      this.shuffleGrid();
      this.initPlayer();
    },
    changeTheme() {
      return this.$store.dispatch("changeTheme");
    },
    clicked(item) {
      let temp = Object.keys(this.try);

      if (temp.length < 2) {
        if (this.found[item] || this.try[item]) return;
        this.single++;
        this.click[item].state = true;
        this.try[item] = item;
        temp = Object.keys(this.try);
      }

      if (temp.length >= 2 && this.allowed) {
        this.allowed = false;
        setTimeout(() => {
          this.allowed = true;
          if (this.click[temp[0]].value === this.click[temp[1]].value) {
            this.found[this.try[temp[0]]] = true;
            this.found[this.try[temp[1]]] = true;
            this.try = {};

            this.players[this.turn]++;
            if (this.turn == this.playersNumb) {
              this.turn = 0;
            }
            this.turn++;
            return;
          }

          this.click[this.try[temp[0]]].state = false;
          this.click[this.try[temp[1]]].state = false;
          this.try = {};
          if (this.turn == this.playersNumb) {
            this.turn = 0;
          }
          this.turn++;
        }, 1000);
      }
    },
  },
  components: { HelloWorld, Results },
};
</script>

<style></style>
