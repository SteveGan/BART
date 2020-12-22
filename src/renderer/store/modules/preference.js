const state = {
  expName:'测试用标题',
  expIntroduction: '本次实验需要做的准备本次实验需要做的准备本次实验需要做的准备本次实验需要做的准备本次实验需要做的准备本次实验需要做的准备本次实验需要做的准备',
  expSettingList: [
    {
      title: '假的奖励',
      description: '奖励是假的，大家',
      scorePerBlow: 400,
      unit: '分',
      balloons: [
        {maxBlow: 5, count: 20},
        {maxBlow: 3, count: 5}
      ]
    },
    {
      title: '真的奖励',
      description: 'will get real prize',
      scorePerBlow: 300,
      unit: '¥',
      balloons: [
        {maxBlow: 7, count: 20},
        {maxBlow: 3, count: 5}
      ]
    },
  ],
}

const getters = {
  
}

const actions = {
  setExpSettingList({commit}, expSettingList){
    //TODO: type checking
    commit('setExpSettingList', expSettingList);
  }
}

const mutations = {
  setExpSettingList: (state, expSettingList) => state.expSettingList = expSettingList
}

export default {
  state,
  mutations,
  actions,
  getters,
}