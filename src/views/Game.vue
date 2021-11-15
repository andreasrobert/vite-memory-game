<template>
  <div
    class="justify-center flex-col flex items-center h-screen"
    :class="` bg-${color.ten} text-${color.six} `"
  >
    <router-link to="/">
      <div
        class="
          flex
          text-2xl
          cursor-pointer
          mb-[27px]
          mt-[14px]
          text-dblue
          justify-center
          rounded-[26px]
          items-center
          h-[52px]
          w-[256px]
        "
        :class="` bg-${color.eight} 
        hover:bg-${color.seven}`"
      >
        New Game
      </div>
    </router-link>
    <div :style="{ columnCount: `${shuffle.grid}` }">
      <div class="mb-[10px]" v-for="item in shuffle.array" :key="item">
        <div
          class="
            flex
            text-white
            justify-center
            items-center
            w-[82px]
            h-[82px]
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
          }`"
          @click="clicked(item)"
        >
          <!-- {{item}} -->
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
    </div>
    <!-- {{set['Numbers of Players']}} -->
    <!-- {{ turn }} -->
    <div class="flex">
      <div class="flex flex-col items-center" v-for="(wins, player) in players" :key="player">
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
          "
          :class="`${player == turn ? `bg-${color.one} text-${color.ten}` :`bg-${color.eight}`}`"
        >
          Player {{ player }} 
          
          <h2>{{wins}}</h2>
          <div v-if="player == turn" class="transform rotate-45 w-[20px] h-[20px] absolute mx-auto top-[-10px] -inset-x-0" :class=" `bg-${color.one}`"></div>
        </div>
        <div v-if="player == turn" class="text-[13px] tracking-[5px]" :class="`text-${color.four}`">CURRENT TURN</div>
      </div>
    </div>
  </div>
</template>

<script>
import { icons, numbers } from "../components/data";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  setup() {
    const store = useStore();
    const settings = computed(() => store.state.setting);
    let players = {};
    let playersNumb = settings.value["Numbers of Players"];
    for (let i = 1; i <= playersNumb; i++) {
      players[i] = 0;
    }
    return {
      players,
      playersNumb,
    };
  },
  data() {
    let array = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
    ];
    //  let array = [
    //   0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
    // ];
    let click = {};

    array.forEach((numb) => {
      click = { ...click, [numb]: { state: false, value: icons[numb] } };
      // click[numb].state = false;
      // click[numb].value = icons[numb]
    });

    return {
      grid: ["4x4", "6x6"],
      icons,
      numbers,
      state: {},
      click: click,
      try: {},
      found: {},
      single: 0,
      turn: 1,
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
      let array = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
      ];
      let grid = 6;
      if (this.set["Grid Size"] === "4x4") {
        array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        grid = 4;
      }
      let m = array.length,
        t,
        i;
      while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }
      return { array, grid };
    },
  },
  methods: {
    changeTheme() {
      return this.$store.dispatch("changeTheme");
    },
    setImage(image) {
      return require(`${image}`);
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

      if (temp.length >= 2) {
        setTimeout(() => {
          if (this.click[temp[0]].value === this.click[temp[1]].value) {
            console.log("foundd");
            this.found[this.try[temp[0]]] = true;
            this.found[this.try[temp[1]]] = true;
            this.try = {};

            this.players[this.turn]++
            if (this.turn == this.playersNumb) {
              this.turn = 0;
            }
            this.turn++;
            console.log(this.found)
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
  components: { Option },
};
</script>

<style>
.me {
  cursor: pointer;
}
</style>
