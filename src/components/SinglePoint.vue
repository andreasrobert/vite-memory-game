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
    :class="`bg-${color.eight}`"
  >
    <div class="">Time</div>
    <div class="">{{ formattedElapsedTime }}</div>
  </div>
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
    :class="`bg-${color.eight}`"
  >
    <div class="" @click="start">Moves</div>
    <div class="">{{ turn }}</div>
  </div>
</template>

<script>
export default {
  props: {
    turn: Number,
  },
  computed: {
    formattedElapsedTime() {
      const date = new Date(null);
      date.setSeconds(this.elapsedTime / 1000);
      const utc = date.toUTCString();
      return utc.substr(utc.indexOf(":") + 2, 4);
    },
    color() {
      return this.$store.state.color;
    },
    time() {
      return;
    },
  },
  data() {
    return {
      elapsedTime: 0,
      timer: undefined,
    };
  },
  methods: {
    start() {
      this.timer = setInterval(() => {
        this.elapsedTime += 1000;
      }, 1000);
    },
    reset() {
      clearInterval(this.timer);
      this.elapsedTime = 0;
    },
    getTime() {
      clearInterval(this.timer);
      return this.formattedElapsedTime;
    },
  },
};
</script>
