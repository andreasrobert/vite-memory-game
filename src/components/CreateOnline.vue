<template>
<form @submit.prevent="joinRoom">
          <input
            class="rounded-[40px]"
            style="
              border: 1px solid black;
              width: 100%;
              padding: 13px 13px 13px 23px;
            "
            v-model="roomInput"
            placeholder="Room name . . . "
          />
          <div
            class="
              
              text-white text-2xl
              flex
              justify-center
              items-center
              h-[52px]
              mt-[14px]
              rounded-[26px]
              sm:h-[45px] sm:mt-[10px]
            "
            :class="`bg-${color.one}  text-${color.ten} ${!created && `cursor-pointer hover:bg-${color.nine}`}`"
            @click="some"
          >
          <div v-if="!created">
            Create room as Player 1 
          </div>
          <div v-if="created">
            Playing as Player 1
          </div>
            
          </div>
          
      </form>
        <div v-for="player in gameSets['Numbers of Players']-1" :key="player">
          <OnlinePlayerButton :player="player+1" :filled="filled" />
        </div>
        
        
        <!-- <router-link to="/online-game">
        </router-link> -->
        <div
            class="
              cursor-pointer
              text-white text-2xl
              flex
              justify-center
              items-center
              h-[52px]
              mt-[14px]
              rounded-[26px]
              sm:h-[45px] sm:mt-[10px]
            "
            :class="`bg-${color.four} hover:bg-${color.three} text-${color.ten}`"
            @click="back"
          >
            Back
          </div>
</template>



<script>
import store from "../store";
import Option from "../components/Option.vue";
import OnlinePlayerButton from "../components/OnlinePlayerButton.vue";
import OptionNumber from "../components/OptionNumber.vue";
import useShuffleGrid from "../composables/useShuffleGrid";

export default {
  setup(){
      const { click, array, gridSize, initClick, shuffleGrid } = useShuffleGrid();
      return {
          array,
          gridSize,
          click,
          shuffleGrid,
          initClick,
        };
    },
    props: {
    filled: Number,
    joinARoom: Function,
    created: Boolean,
    joined: Boolean,
    roomInput: String,
    back: Function,
  },
  data() {
    return {

    };
  },
  mounted() {
    // this.connect();
  },
  computed: {
    color() {
      return this.$store.state.color;
    },
    gameSets(){
      return this.$store.state.setting;
    },
  },
  methods:{
      some(){
          console.log({
        click: this.click,
        array: this.array,
        gridSize: this.gridSize,
      });
      }
  },
  components: { Option, OnlinePlayerButton, OptionNumber },
};
</script>

<style></style>
