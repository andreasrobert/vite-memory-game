<template>
  <div
    class="
      text-white text-2xl
      flex
      justify-center
      items-center
      h-[52px]
      mt-[14px]
      rounded-[26px]
      sm:h-[45px] sm:mt-[10px] sm:text-[5vw]
    "
    :class="`bg-${color.two} text-${color.ten}`"
  >
  <div v-if="filled >= player">
    Player {{player}} connected
    </div>
    <div v-if="filled < player">
    Waiting for Player {{player}} . . .
    </div>
  </div>
</template>

<script>
import store from "../store";

export default {
  data() {
    return {};
  },
  props: {
    player: Number,
    filled: Number
  },
  computed: {
    color() {
      return this.$store.state.color;
    },
    setting() {
      return this.$store.state.setting;
    },
  },
  methods: {},
  watch: {},
};
</script>

<style>
h3 {
  font-size: 20px;
}
</style>
