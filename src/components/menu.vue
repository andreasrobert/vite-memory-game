<template>
  <div class="absolute">
    <div
      class="fixed flex justify-center items-center w-full h-full"
      style="background-color: #00000075"
    >
      <div class="bg-white w-[474px] rounded-[20px] p-[56px]">
        <h1>It's a tie!</h1>
        <h4>Game over! Here are the results...</h4>
        <div class="flex">
          <h1>Player 1</h1>
          <h1>2 Pairs</h1>
        </div>
        <div class="flex justify-between">
          <div
            class="cursor-pointer flex justify-center items-center w-[45%]"
            :class="` bg-${color.one} 
        hover:bg-${color.nine}`"
          >
            Restart
          </div>
              <router-link to="/">

          <div
            class="cursor-pointer flex justify-center items-center w-[45%]"
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
  computed: {
    color() {
      return this.$store.state.color;
    },
  },
};
</script>
