import { createStore } from 'vuex'

const themeOne = {
  one: 'orange',
  two:"lgrey",
  three:"gdblue",
  four:"dblue",
  five:"grey",
  six:"gblue",
  seven:"blue",
  eight:"white",
}

const themeTwo = {
  one: 'green',
  two:"green",
  three:"green",
  four:"green",
  five:"green",
  six:"red",
  seven:"red",
  eight:"red",
}

export default createStore({
  state: {
    color: themeOne,
    setting:{
      theme:'Numbers',
      player: 1,
      grid:4
    }
  },
  mutations: {
    themeColor(state){
      state.color = themeTwo
    }
  },
  actions: {
    changeTheme({commit}){
      commit('themeColor')
    }
  },
  modules: {}
})



