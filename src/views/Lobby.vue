<template>
  <div
    class="justify-center flex flex-col items-center h-screen"
    :class="` bg-${color.four} text-${color.six}`"
  >
    <div class="flex">
    <img
      src="/logo.svg"
      :style="styleImg"
      alt=""
    />
    online {{roomInput}}
    </div>
    <!-- <div></div> -->
    <div
      class="bg-white w-[504px] rounded-[20px] p-[48px] sm:w-[85vw] sm:p-[30px]"
    >
    <div v-if="create && !join">
    <form  @submit.prevent="joinRoom">
    <input v-model="roomInput" placeholder="Room name . . . " />    
    </form>
      <router-link to="/online-game">
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
          :class="`bg-${color.four} text-${color.ten}`"
        >
          You are Player 1
        </div>
      </router-link>
    </div>

    <div v-if="!create && !join">
      <Option :header="'Select Theme'" :content="themes" />
      <Option :header="'Numbers of Players'" :content="players" />
      <Option :header="'Grid Size'" :content="grid" />
      <Option :header="'Create or Join Game'"/>

          <div class="flex mt-[14px] sm:mt-[10px]  justify-between">
        <div
          class="
            cursor-pointer
            text-white text-2xl
            flex
            justify-center
            items-center
            h-[52px]
            sm:text-[5vw]
            w-[192px] sm:w-[32vw]
            rounded-[26px]
            sm:h-[45px] 
          "
          :class="` bg-${color.one} hover:bg-${color.nine}`"
          @click="createGame"
        >
          Create Game
        </div>
         <div
          class="
            cursor-pointer
            text-white text-2xl
            flex
            justify-center
            items-center
            h-[52px]
            sm:text-[5vw]
            w-[192px] sm:w-[32vw]
            rounded-[26px]
            sm:h-[45px] 
          "
          :class="` bg-${color.one} hover:bg-${color.nine}`"
          @click=""
        >
          Join Game
        </div>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import Option from "../components/Option.vue";

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
      create:false,
      join:false,
      ws: null,
        serverUrl: "ws://localhost:8080/ws",
        roomInput: null,
        rooms: [],
        user: {
        name: "p1"
        },
        users: [],
        initialReconnectDelay: 1000,
        currentReconnectDelay: 0,
        maxReconnectDelay: 16000
    };
  },
  mounted(){
      this.connect()
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
    createGame(){
        return this.create = true
    },
    connect() {
      this.connectToWebsocket();
    },
    connectToWebsocket() {
        console.log("going")
      this.ws = new WebSocket(this.serverUrl + "?name=" + new Date());
      this.ws.addEventListener('open', (event) => { this.onWebsocketOpen(event) });
      this.ws.addEventListener('message', (event) => { this.handleNewMessage(event) });
      this.ws.addEventListener('close', (event) => { this.onWebsocketClose(event) });
    },
    onWebsocketOpen() {
      console.log("connected to WS!");
      this.currentReconnectDelay = 1000;
    },

    onWebsocketClose() {
      this.ws = null;

      setTimeout(() => {
        this.reconnectToWebsocket();
      }, this.currentReconnectDelay);

    },

    reconnectToWebsocket() {
      if (this.currentReconnectDelay < this.maxReconnectDelay) {
        this.currentReconnectDelay *= 2;
      }
      this.connectToWebsocket();
    },

    handleNewMessage(event) {
      let data = event.data;
      data = data.split(/\r?\n/);
        console.log(data)
      console.log(JSON.parse(data))

      for (let i = 0; i < data.length; i++) {
        let msg = JSON.parse(data[i]);
        console.log(msg)
        switch (msg.action) {
          case "send-message":
            this.handleChatMessage(msg);
            break;
          case "user-join":
            this.handleUserJoined(msg);
            break;
          case "user-left":
            this.handleUserLeft(msg);
            break;
          case "room-joined":
            this.handleRoomJoined(msg);
            break;
          default:
            break;
        }

      }
    },
    handleChatMessage(msg) {
      const room = this.findRoom(msg.target.id);
      if (typeof room !== "undefined") {
        room.messages.push(msg);
      }
    },
    handleUserJoined(msg) {
      this.users.push(msg.sender);
    },
    handleUserLeft(msg) {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id == msg.sender.id) {
          this.users.splice(i, 1);
        }
      }
    },
    handleRoomJoined(msg) {
      room = msg.target;
      room.name = room.private ? msg.sender.name : room.name;
      room["messages"] = [];
      this.rooms.push(room);
    },
    sendMessage(room,array) {
      if (room.newMessage !== "") {
        this.ws.send(JSON.stringify({
          action: 'send-message',
          message: array,
          target: {
            id: room.id,
            name: room.name
          }
        }));
        room.newMessage = "";
      }
    },
    findRoom(roomId) {
      for (let i = 0; i < this.rooms.length; i++) {
        if (this.rooms[i].id === roomId) {
          return this.rooms[i];
        }
      }
    },
    joinRoom() {
      this.ws.send(JSON.stringify({ action: 'join-room', message: this.roomInput }));
      this.roomInput = "";
    },
    leaveRoom(room) {
      this.ws.send(JSON.stringify({ action: 'leave-room', message: room.id }));

      for (let i = 0; i < this.rooms.length; i++) {
        if (this.rooms[i].id === room.id) {
          this.rooms.splice(i, 1);
          break;
        }
      }
    },
    joinPrivateRoom(room) {
      this.ws.send(JSON.stringify({ action: 'join-room-private', message: room.id }));
    }
  },
  components: { Option },
};
</script>

<style></style>
