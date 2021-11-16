<template>
  <div class="absolute">
    <div
      class="fixed flex justify-center items-center w-full h-full"
      style="background-color: #00000075"
    >
      <div class="bg-white flex flex-col w-[90vw] rounded-[20px] p-[50px]">
        <div
          class="
            cursor-pointer
            rounded-[26px]
            h-[47px]
            mb-[25px]
            flex
            justify-center
            items-center
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
              rounded-[26px]
              h-[47px]
              mb-[25px]
              flex
              justify-center
              items-center
            "
            :class="` bg-${color.eight} 
        hover:bg-${color.seven}`"
          >
            New Game
          </div>
        </router-link>
        <div
          class="
            cursor-pointer
            rounded-[26px]
            h-[47px]
            flex
            justify-center
            items-center
          "
          :class="` bg-${color.eight} 
        hover:bg-${color.seven}`"
        @click="handleMenu"
        >
          Resume Game
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    handleMenu: Function,
    restart: Function,
  },
  computed: {
    color() {
      return this.$store.state.color;
    },
  },
};
</script>
