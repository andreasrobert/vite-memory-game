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
      <!-- <div></div> -->
      <img class="object-none" src="/logo.svg" alt="" />
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
          Restart O
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
          @click="handleMenu"
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
          @click="clickOnline(item)"
        >
          <!-- {{ item }} -->
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
          v-if="playersNumb > 1"
          class="flex flex-col items-center"
          v-for="(wins, player) in players"
          :key="player"
        >
          <PlayerTurn :player="player" :wins="wins" :turn="turn" />
        </div>
        <SinglePoint v-if="playersNumb === 1" :turn="single" ref="root" />
      </div>
    </div>
  </div>
  <Results v-if="finish && playersNumb > 1" :players="players" :restart="restart" />
  <MenuMobile v-if="showMenu" class="lg:hidden" :handleMenu="handleMenu" :restart="restart" />
  <SingleResult v-if="finish && playersNumb === 1" :players="players" :restart="restart" :turn="single" :last="last" />
</template>

<script>
import { numbers, icons } from "../components/data";
import { ref, h } from "vue";
import Results from "../components/Results.vue";
import usePlayerInit from "../composables/usePlayerInit";
import useShuffleGrid from "../composables/useShuffleGrid";
import PlayerTurn from "../components/PlayerTurn.vue";
import SinglePoint from "../components/SinglePoint.vue";
import SingleResult from "../components/SingleResult.vue";
import MenuMobile from "../components/MenuMobile.vue";

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
    return {
      players,
      playersNumb,
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
      first: true,
      turn: 1,
      allowed: true,
      last: undefined,
      showMenu: false
    };
  },
  computed: {
    finish() {
      if(Object.keys(this.found).length === this.gridSize * this.gridSize){
        this.last = this.$refs?.root?.getTime()
        return true
      }
      return false
    },
    color() {
      return this.$store.state.color;
    },
    set() {
      return this.$store.state.setting;
    },
    click(){
      return this.$store.state.multi.click
    },
    array(){
      return this.$store.state.multi.array
    },
    gridSize(){
      return this.$store.state.multi.gridSize
    },
    ws(){
      return this.$store.state.ws;
    },
    playerTurn(){
      return this.$store.state.playerTurn;
    },
  },
   mounted() {
    this.connectToWebsocket();
  },
  methods: {
    connectToWebsocket() {
      this.ws.addEventListener("open", (event) => {
        this.onWebsocketOpen(event);
      });
      this.ws.addEventListener("message", (event) => {
        this.handleNewMessage(event);
      });
      this.ws.addEventListener("close", (event) => {
        // this.onWebsocketClose(event);
      });
    },
    handleNewMessage(event) {
      let data = event.data;
      data = data.split(/\r?\n/);

      for (let i = 0; i < data.length; i++) {
        let msg = JSON.parse(data[i]);
        console.log(msg);
        switch (msg.action) {
          case "room-joined":
            this.handleRoomJoined(msg);
            break;
          case "player-added":
            this.filled = +msg.message.filled
            this.changeSettings('Numbers of Players', msg.message.size)
            this.changeSettings('Grid Size', msg.message.grid)
            this.changeSettings('Select Theme', msg.message.theme)
            if(this.create && this.filled >= msg.message.size  ){
                this.makeOnlineGame()
            }
            break;
          case "init-game":
            console.log("making game",msg.message)
            store.commit("changeMulti", msg.message)
            this.$router.push('online-game')
            break;
          case "item-clicked":
            console.log("something")
            this.clicked(msg.message)
            break;
          default:
            break;
        }
      }
    },
    handleMenu(){
      this.showMenu =  !this.showMenu
    },
    restart() {
      this.turn = 1;
      this.single = 0;
      this.found = {};
      this.try = {};

      //.click = this.initClick();
      //this.shuffleGrid();
      this.initPlayer();
      this.playersNumb === 1 && this.$refs.root.reset();
      this.first = true;
    },
    changeTheme() {
      return this.$store.dispatch("changeTheme");
    },
    clickOnline(item){
      console.log(this.playerTurn, this.turn)
      if(this.playerTurn != this.turn) return
      this.ws.send(
          JSON.stringify({
            action: "item-clicked",
            message: item,
          })
        );
    },
    clicked(item) {
      
      let temp = Object.keys(this.try);

      if (this.first && this.playersNumb === 1) {
        this.first = false;
        this.$refs.root.start();
      }

      if (temp.length < 2) {
        if (this.found[item] || this.try[item]) return;
        this.click[item].state = true;
        this.try[item] = item;
        temp = Object.keys(this.try);
      }

      if (temp.length >= 2 && this.allowed) {
        this.allowed = false;
        setTimeout(() => {
          this.single++;
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
          console.log(this.turn);
        }, 1000);
      }
    },
  },
  components: { HelloWorld, Results, PlayerTurn, SinglePoint, SingleResult, MenuMobile },
};
</script>

<style></style>
