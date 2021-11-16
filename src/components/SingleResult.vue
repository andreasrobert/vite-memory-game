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
          sm:w-[94vw]
          sm:p-[30px]
        "
      >
        <h1 class="text-[45px]">You did it!</h1>
        <h4 class="mb-[20px]">Game over! Here are the results...</h4>

        <div
          class="
            flex
            mb-[15px]
            p-[17px]
            rounded-[8px]
            justify-between
            items-center
            w-full
          "
          :class="`bg-${color.eight}`"
        >
          <h1>Time Elapsed</h1>
          <h1 class="text-[24px]">{{ last }}</h1>
        </div>

          <div
          class="
            flex
            mb-[15px]
            p-[17px]
            rounded-[8px]
            justify-between
            items-center
            w-full
          "
          :class="`bg-${color.eight}`"
        >
          <h1>Moves Taken</h1>
          <h1 class="text-[24px]">{{ turn }} Moves</h1>
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
              sm:w-[35vw]
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
                sm:w-[35vw]
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
    turn: Number,
    last: String
  },
  computed: {
    color() {
      return this.$store.state.color;
    },
  },
};
</script>
