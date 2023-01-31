<template>
  <div
    class="justify-center flex flex-col items-center h-screen"
    :class="` bg-${color.four} text-${color.six}`"
  >
    <router-link to="/">
      <div
        class="absolute top-[15px] p-[5px] px-[15px] rounded-[26px] text-white text-[19px] right-[17px]"
        :class="` bg-${color.one} hover:bg-${color.nine}`"
        @click="back"
      >
        Back
      </div>
    </router-link>
    <div class="flex">
      <!-- <img src="/logo.svg" :style="styleImg" alt="" @click="sendMessage" /> -->
      <img src="/logo.svg" :style="styleImg" alt="" @click="makeOnlineGame" />
      online
    </div>
    <!-- <div></div> -->
    <div class="bg-white w-[504px] rounded-[20px] p-[48px] sm:w-[85vw] sm:p-[30px]">
      <div v-if="create && !join">
        <form @submit.prevent="joinRoom">
          <input
            class="rounded-[40px]"
            style="border: 1px solid black; width: 100%; padding: 13px 13px 13px 23px"
            v-model="roomInput"
            placeholder="Room name . . . "
          />
          <div
            class="text-white text-2xl flex justify-center items-center h-[52px] mt-[14px] rounded-[26px] sm:h-[45px] sm:mt-[10px] sm:text-[5vw]"
            :class="`bg-${color.one}  text-${color.ten} ${
              !created && `cursor-pointer hover:bg-${color.nine}`
            }`"
            @click="joinRoom"
          >
            <div v-if="!created">Create room as Player 1</div>
            <div v-if="created">Playing as Player 1</div>
          </div>
        </form>
        <div v-for="player in gameSets['Numbers of Players'] - 1" :key="player">
          <OnlinePlayerButton :player="player + 1" :filled="filled" />
        </div>

        <!-- <router-link to="/online-game">
        </router-link> -->
        <div
          class="cursor-pointer text-white text-2xl flex justify-center items-center h-[52px] mt-[14px] rounded-[26px] sm:h-[45px] sm:mt-[10px]"
          :class="`bg-${color.four} hover:bg-${color.three} text-${color.ten}`"
          @click="back"
        >
          Back
        </div>
      </div>

      <div v-if="!create && join">
        <form @submit.prevent="joinARoom">
          <input
            class="rounded-[40px]"
            style="border: 1px solid black; width: 100%; padding: 13px 13px 13px 23px"
            v-model="roomInput"
            placeholder="Room name . . . "
          />
          <div
            class="text-white text-2xl flex justify-center items-center h-[52px] mt-[14px] rounded-[26px] sm:h-[45px] sm:mt-[10px]"
            :class="`bg-${color.one}  text-${color.ten} ${
              !created && `cursor-pointer hover:bg-${color.nine}`
            }`"
            @click="joinARoom"
            v-if="!joined"
          >
            <div v-if="!created">Join room</div>
          </div>
        </form>
        <div v-if="joined">
          <div v-for="player in gameSets['Numbers of Players']" :key="player">
            <OnlinePlayerButton :player="player" :filled="filled" />
          </div>
        </div>

        <!-- <router-link to="/online-game">
        </router-link> -->
        <div
          class="cursor-pointer text-white text-2xl flex justify-center items-center h-[52px] mt-[14px] rounded-[26px] sm:h-[45px] sm:mt-[10px]"
          :class="`bg-${color.four} hover:bg-${color.three} text-${color.ten}`"
          @click="back"
        >
          Back
        </div>
      </div>

      <div v-if="!create && !join">
        <Option :header="'Select Theme'" :content="themes" />
        <OptionNumber :header="'Numbers of Players'" :content="players" />
        <Option :header="'Grid Size'" :content="grid" />
        <Option :header="'Create or Join Game'" />

        <div class="flex mt-[14px] sm:mt-[10px] justify-between">
          <div
            class="cursor-pointer text-white text-2xl flex justify-center items-center h-[52px] sm:text-[5vw] w-[192px] sm:w-[32vw] rounded-[26px] sm:h-[45px]"
            :class="` bg-${color.one} hover:bg-${color.nine}`"
            @click="createGame"
          >
            Create Game
          </div>
          <div
            class="cursor-pointer text-white text-2xl flex justify-center items-center h-[52px] sm:text-[5vw] w-[192px] sm:w-[32vw] rounded-[26px] sm:h-[45px]"
            :class="` bg-${color.one} hover:bg-${color.nine}`"
            @click="joinGame"
          >
            Join Game
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
import Option from "../components/Option.vue";
import OnlinePlayerButton from "../components/OnlinePlayerButton.vue";
import OptionNumber from "../components/OptionNumber.vue";
import useShuffleGrid from "../composables/useShuffleGrid";

const SERVER = "memory-game-server-production.up.railway.app";

export default {
  data() {
    return {
      themes: ["Numbers", "Icons"],
      players: 4,
      grid: ["4x4", "6x6"],
      styleImg: {
        filter:
          "invert(99%) sepia(22%) saturate(2%) hue-rotate(273deg) brightness(113%) contrast(100%)",
        marginBottom: "20px",
        objectFit: "none",
      },
      create: false,
      join: false,
      serverUrl: "ws://localhost:8080/ws",
      roomInput: null,
      rooms: [],
      user: {
        name: "p1",
      },
      users: [],
      initialReconnectDelay: 1000,
      currentReconnectDelay: 0,
      maxReconnectDelay: 16000,
      filled: 1,
      created: false,
      joined: false,
    };
  },
  mounted() {
    // this.connect();
  },
  computed: {
    color() {
      return this.$store.state.color;
    },
    gameSets() {
      return this.$store.state.setting;
    },
    ws() {
      return this.$store.state.ws;
    },
    playerTurn() {
      return this.$store.state.playerTurn;
    },
  },
  methods: {
    changeTheme() {
      return this.$store.dispatch("changeTheme");
    },
    createGame() {
      return (this.create = true);
    },
    joinGame() {
      return (this.join = true);
    },
    back() {
      if (this.ws) {
        this.ws.close();
        this.ws = null;
      }
      this.filled = 1;
      this.created = false;
      this.joined = false;
      this.join = false;
      return (this.create = false);
    },
    connectToWebsocket() {
      if (this.ws) {
        this.ws.close();
        this.ws = null;
      }
      console.log("going");
      let sets = this.gameSets;
      let theme = sets["Select Theme"];
      let grid = sets["Grid Size"];
      let size = sets["Numbers of Players"];

      store.commit("initTurn", 1);
      store.commit(
        "initWs",
        new WebSocket(
          `wss://${SERVER}/ws?name=${this.roomInput}&theme=${theme}&grid=${grid}&size=${size}&create=true`
        )
      );

      this.ws.addEventListener("open", (event) => {
        this.onWebsocketOpen(event);
      });
      this.ws.addEventListener("message", (event) => {
        this.handleNewMessage(event);
      });
      this.ws.addEventListener("close", (event) => {
        this.onWebsocketClose(event);
      });
    },
    onWebsocketOpen() {
      console.log("connected to WS!");
      this.created = true;
      this.joined = true;
      this.currentReconnectDelay = 1000;
    },

    joinARoom() {
      if (!this.roomInput) return console.log("put something in to join");

      if (this.ws) {
        this.ws.close();
        this.ws = null;
      }
      console.log("going");
      let sets = this.gameSets;
      let theme = sets["Select Theme"];
      let grid = sets["Grid Size"];
      let size = sets["Numbers of Players"];

      store.commit(
        "initWs",
        new WebSocket(
          `wss://${SERVER}/ws?name=${this.roomInput}&theme=${theme}&grid=${grid}&size=${size}&create=false`
        )
      );

      this.ws.addEventListener("open", (event) => {
        this.onWebsocketOpen(event);
      });
      this.ws.addEventListener("message", (event) => {
        this.handleNewMessage(event);
      });
      this.ws.addEventListener("close", (event) => {
        this.onWebsocketClose(event);
      });
    },

    onWebsocketClose() {
      // this.ws.close()
      this.ws = null;

      // setTimeout(() => {
      //   this.reconnectToWebsocket();
      // }, this.currentReconnectDelay);
    },

    // reconnectToWebsocket() {
    //   if (this.currentReconnectDelay < this.maxReconnectDelay) {
    //     this.currentReconnectDelay *= 2;
    //   }
    //   this.connectToWebsocket();
    // },

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
            this.filled = +msg.message.filled;
            this.changeSettings("Numbers of Players", msg.message.size);
            this.changeSettings("Grid Size", msg.message.grid);
            this.changeSettings("Select Theme", msg.message.theme);
            if (!this.playerTurn) {
              store.commit("initTurn", msg.sender);
            }
            if (this.create && msg.sender >= msg.message.size) {
              this.makeOnlineGame();
            }
            break;
          case "player-deleted":
            this.filled = +msg.message.number;
            break;
          case "init-game":
            console.log("making game", msg.message);
            store.commit("changeMulti", msg.message);
            this.$router.push("online-game");
          default:
            break;
        }
      }
    },
    makeOnlineGame() {
      const { click, array, gridSize, initClick, shuffleGrid } = useShuffleGrid();
      let data = {
        click: click,
        array: array,
        gridSize: gridSize.value,
        initClick: initClick,
        shuffleGrid: shuffleGrid,
      };
      console.log(data);
      this.ws.send(
        JSON.stringify({
          action: "init-game",
          message: data,
        })
      );
    },
    changeSettings(header, item) {
      store.commit("changeSettings", { header, item });
    },
    handleRoomJoined(msg) {
      room = msg.target;
      room.name = room.private ? msg.sender.name : room.name;
      room["messages"] = [];
      this.rooms.push(room);
    },
    sendMessage() {
      console.log("sendddingg");
      this.ws.send(
        JSON.stringify({
          action: "sending a message",
          message: "hellllooo",
        })
      );
    },
    joinRoom() {
      if (this.roomInput) {
        this.connectToWebsocket();
      } else {
        console.log("put something in");
      }
    },
  },
  components: { Option, OnlinePlayerButton, OptionNumber },
};
</script>

<style></style>
