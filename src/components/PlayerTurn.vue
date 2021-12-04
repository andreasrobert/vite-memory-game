<template>
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
      player == turn ? `bg-${color.one} text-${color.ten}` : `bg-${color.eight}`
    }`"
  >
    <div class="sm:hidden">Player {{ player }} {{playerTurn}}</div>
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
  <div v-if="turn == playerTurn">
  YOUR TURN
  </div>
  <div v-if="turn != playerTurn">
    CURRENT TURN 
   </div>
  </div>
</template>

<script>
export default {
  props: {
    player: String,
    wins: Number,
    turn: Number,
  },
  computed: {
    color() {
      return this.$store.state.color;
    },
    playerTurn(){
      return this.$store.state.playerTurn;
    },
  },
};
</script>
