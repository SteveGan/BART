const state = {
  expName:'测试用标题',
  expIntroduction: '本次实验需要做的准备本次实验需要做的准备本次实验需要做的准备本次实验需要做的准备本次实验需要做的准备本次实验需要做的准备本次实验需要做的准备',
  expSettingList: [
    {
      title: '虚拟奖励奖励',
      description: '点击气球获取虚拟积分，请尽量在最短的时间里以最大分数完成实验',
      scorePerBlow: 200,
      unit: '分',
      balloons: [
        {maxBlow: 7, count: 2},
        {maxBlow: 4, count: 1},
        {maxBlow: 8, count: 3},
        {maxBlow: 9, count: 2},
      ]
    },
    {
      title: '真的奖励',
      description: 'will get real prize will get real prizewill get real prizewill get real prizewill get real prizewill get real prizewill get real prizewill get real prizewill get real prize',
      scorePerBlow: 400,
      unit: '¥',
      balloons: [
        {maxBlow: 4, count: 1},
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