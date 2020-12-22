
const state = {
  expList:[],
}

const getters = {

}

const actions = {
  setExpList({commit}, expList){
    commit('setExpList', expList)
  }
}

const mutations = {
  setExpList: (state, expList) => state.expList = expList
}

export default {
  state,
  mutations,
  actions,
  getters
}