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
  nine:"lorange",
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
      'Select Theme':'Numbers',
      'Numbers of Players': 1,
      'Grid Size':"4x4"
    }
  },
  mutations: {
    changeSettings(state, payload){
      state.setting[payload.header] = payload.item
    },


  },
  actions: {
    changeSettings({commit}){
      commit('changeSettings')
    },
  
  },
  modules: {},
  
})



