<template>
  <div :class="`justify-center flex bg-${color.four} items-center h-screen`">
  <div class="bg-white w-[654px] h-[559px] rounded-[20px]	">
    
  </div>

  </div>
</template>

<script>

export default {
  data(){
    return{
      color:"primary"
    }
  },
  computed:{
    color(){
      return this.$store.state.color
    }
  },
  methods:{
    changeTheme(){
      return this.$store.dispatch('changeTheme')
    }
  }
}

</script>

<style>
.me{
  cursor: pointer;
}

</style>
