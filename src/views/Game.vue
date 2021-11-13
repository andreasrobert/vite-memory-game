<template>
  <div
    :class="`justify-center flex bg-${color.eight} text-${color.six} items-center h-screen`"
  >
  <div class="w-[572px] h-[572px] bg-blue">
    <div  v-for="item in 6" :key=item>
    <div class="w-[82px] h-[82px] rounded-full bg-orange"></div>
    </div>
    </div>
  </div>
</template>

<script>

export default {
    data() {
        return {
            themes: ["Numbers", "Icons"],
            players: 4,
            grid: ["4x4", "6x6"],
        };
    },
    computed: {
        color() {
            return this.$store.state.color;
        },
        set() {
            return this.$store.state.setting;
        },
    },
    methods: {
        changeTheme() {
            return this.$store.dispatch("changeTheme");
        },
    },
    components: { Option }
};
</script>

<style>
.me {
  cursor: pointer;
}
</style>
