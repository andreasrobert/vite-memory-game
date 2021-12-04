import { createStore } from 'vuex'

const themeOne = {
  one: 'orange',
  two:"lgrey",
  three:"gdblue",
  four:"dblue",
  five:"grey",
  six:"gblue",
  seven:"blue",
  eight:"dwhite",
  nine:"lorange",
  ten:"white"
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
    },
    multi:null,
    ws: null,
    playerTurn: null,
  },
  mutations: {
    changeSettings(state, payload){
      state.setting[payload.header] = payload.item
    },

    changeMulti(state, payload){
      state.multi = payload
    },
    initWs(state, payload){
      state.ws = payload
    },
    initTurn(state, payload){
      state.playerTurn = payload
    },

  },
  actions: {
    changeSettings({commit}){
      commit('changeSettings')
    },
    changeMulti(commit){
      commit('changeMulti')
    },
    initWs(commit){
      commit('initWs')
    },
    initTurn(commit){
      commit('initTurn')
    },
  
  },
  modules: {},
  
})



