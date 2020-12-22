const state = {
  expName:'测试用标题',
  expIntroduction: '本次实验需要做的准备本次实验需要做的准备本次实验需要做的准备本次实验需要做的准备本次实验需要做的准备本次实验需要做的准备本次实验需要做的准备',
  expSettingList: [
    {
      title: '假的奖励',
      description: '奖励是假的，大家',
      scorePerBlow: 200,
      unit: '分',
      balloons: [
        {maxBlow: 2, count: 2},
        {maxBlow: 4, count: 1}
      ]
    },
    {
      title: '真的奖励',
      description: 'will get real prize will get real prizewill get real prizewill get real prizewill get real prizewill get real prizewill get real prizewill get real prizewill get real prize',
      scorePerBlow: 400,
      unit: '¥',
      balloons: [
        {maxBlow: 4, count: 3},
        {maxBlow: 3, count: 2}
      ]
    },
    {
      title: '真的奖励',
      description: 'will get real prize will get real prizewill get real prizewill get real prizewill get real prizewill get real prizewill get real prizewill get real prizewill get real prize',
      scorePerBlow: 400,
      unit: '¥',
      balloons: [
        {maxBlow: 4, count: 4},
        {maxBlow: 3, count: 1}
      ]
    }
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