<template>
  <h3>{{ header }}</h3>

  <div class="flex justify-between">
    <div v-for="item in content" :key="item">
      <div
        class="
          flex
          text-2xl
          cursor-pointer
          mb-[22px]
          mt-[14px]
          text-white
          justify-center
          rounded-[26px]
          items-center
          h-[52px]
          sm:h-[45px]
          sm:text-[5vw]
          sm:mt-[10px]
          sm:mb-[10px]
        "
        :class="`${
          isSetting(item)
            ? `bg-${color.three}`
            : `bg-${color.two} hover:bg-${color.seven}`
        } 
          ${content === 4 ? 'w-[85px] sm:w-[15vw]' : 'w-[192px] sm:w-[32vw]'}`"
        @click="changeSettings(header, item)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";

export default {
  props: {
    header: String,
    content: [Array, Number],
  },
  computed: {
    color() {
      return this.$store.state.color;
    },
    setting() {
      return this.$store.state.setting;
    },
  },
  methods: {
    isSetting(current) {
      return Object.values(this.setting).includes(current);
    },
    changeSettings(header, item) {
      store.commit("changeSettings", { header, item });
    },
  },
  watch: {
    content() {},
  },
};
</script>

<style>
h3 {
  font-size: 20px;
}
</style>
