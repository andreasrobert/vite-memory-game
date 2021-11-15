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
        "
      >
        <h1>It's a tie!</h1>
        <h4>Game over! Here are the results...</h4>

        <div
          v-for="(wins, player) in players"
          class="
            flex
            mb-[15px]
            p-[17px]
            rounded-[8px]
            justify-between
            w-full
            bg-blue
          "
          :class="`bg-${color.eight}`"
        >
          <h1>Player {{ player }}</h1>
          <h1>{{ wins }} Pairs</h1>
        </div>
        <div class="flex justify-between w-full">
          <div
            class="
              cursor-pointer
              flex
              justify-center
              items-center
              rounded-[26px]
              h-[47px]
              w-[170px]
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
              "
              :class="` bg-${color.eight} 
        hover:bg-${color.seven}`"
            >
              Setup New Game
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
