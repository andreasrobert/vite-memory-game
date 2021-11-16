<template>
  <div class="absolute">
    <div
      class="fixed flex justify-center items-center w-full h-full"
      style="background-color: #00000075"
    >
      <div
        class="
          bg-white
          flex flex-col
          items-center
          w-[474px]
          rounded-[20px]
          p-[56px]
          sm:w-[95vw]
          sm:p-[19px]
        "
      >
        <h1 class="text-[45px]">{{ tie ? "It's a tie!" : `Player ${winner} wins` }}</h1>
        <h4 class="mb-[20px]">Game over! Here are the results...</h4>

        <div
          v-for="(wins, player) in players"
          class="
            flex
            mb-[15px]
            p-[17px]
            rounded-[8px]
            justify-between
            w-full
          "
          :class="`${
            wins === highScore ? `bg-${color.four} text-${color.ten}` : `bg-${color.eight}`
          }`"
        >
          <h1>Player {{ player }} {{ wins === highScore && "(Winner!)" }}</h1>
          <h1>{{ wins }} Pairs</h1>
        </div>
        <div class="flex mt-[10px] justify-between w-full">
          <div
            class="
              cursor-pointer
              flex
              justify-center
              items-center
              rounded-[26px]
              h-[47px]
              w-[170px]
              sm:w-[39vw]
                sm:h-[40px]
            "
            :class="` bg-${color.one} 
        hover:bg-${color.nine}`"
            @click="restart"
          >
            Restart
          </div>
          <router-link to="/">
            <div
              class="
                cursor-pointer
                flex
                justify-center
                items-center
                rounded-[26px]
                h-[47px]
                w-[170px]
                sm:w-[39vw]
                sm:h-[40px]
              "
              :class="` bg-${color.eight} 
        hover:bg-${color.seven}`"
            >
              New Game
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useWinnerIs from "../composables/useWinnerIs";

export default {
  setup(props) {
    const { highScore, tie, winner } = useWinnerIs(props.players);

    return {
      highScore,
      tie,
      winner,
    };
  },
  props: {
    players: Object,
    restart: Function,
  },
  computed: {
    color() {
      console.log(this.players);
      return this.$store.state.color;
    },
  },
};
</script>
