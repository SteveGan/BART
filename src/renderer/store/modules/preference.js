const state = {
  expName: 'Money Game',
  expIntroduction: '本实验分为两轮，第一轮游戏奖励为虚拟货币，第二轮游戏奖励为真实金钱。实验开始，你可以通过按键吹大气球，每吹一次即可获得相应奖赏幅度下的盈利，点击“OK”停止吹气，并保存该气球的收益。每个气球最多可吹128次，气球的爆破点随机（介于1~128间），如果气球爆炸，则该气球收益为零；若气球未爆炸，则获得该气球的收益。奖赏幅度有两种分别为10分和40分，每轮实验有40个气球，共80个气球，在实验中请尽可能盈利。',
  expSettingList: [{
      title: '虚拟金钱奖励',
      description: '本轮游戏奖励为虚拟货币，点击气球获取虚拟积分，请将其想象为真实金钱, 并尽可能盈利。实验结束将会根据积分大小兑换成精美礼品',
      unit: '分',
      balloons: [
        {maxBlow:  41, scorePerBlow: 10, count: 1},
        {maxBlow:  115, scorePerBlow: 10, count: 1},
        {maxBlow:  95, scorePerBlow: 10, count: 1},
        {maxBlow:  27, scorePerBlow: 10, count: 1},
        {maxBlow:  72, scorePerBlow: 40, count: 1},
        {maxBlow:  23, scorePerBlow: 10, count: 1},
        {maxBlow:  35, scorePerBlow: 10, count: 1},
        {maxBlow:  104, scorePerBlow: 40, count: 1},
        {maxBlow:  37, scorePerBlow: 10, count: 1},
        {maxBlow:  113, scorePerBlow: 10, count: 1},
        {maxBlow:  61, scorePerBlow: 10, count: 1},
        {maxBlow:  88, scorePerBlow: 40, count: 1},
        {maxBlow:  31, scorePerBlow: 10, count: 1},
        {maxBlow:  23, scorePerBlow: 10, count: 1},
        {maxBlow:  60, scorePerBlow: 40, count: 1},
        {maxBlow:  31, scorePerBlow: 10, count: 1},
        {maxBlow:  68, scorePerBlow: 40, count: 1},
        {maxBlow:  62, scorePerBlow: 40, count: 1},
        {maxBlow:  41, scorePerBlow: 10, count: 1},
        {maxBlow:  85, scorePerBlow: 10, count: 1},
        {maxBlow:  57, scorePerBlow: 10, count: 1},
        {maxBlow:  56, scorePerBlow: 40, count: 1},
        {maxBlow:  116, scorePerBlow: 40, count: 1},
        {maxBlow:  61, scorePerBlow: 10, count: 1},
        {maxBlow:  72, scorePerBlow: 40, count: 1},
        {maxBlow:  66, scorePerBlow: 40, count: 1},
        {maxBlow:  121, scorePerBlow: 10, count: 1},
        {maxBlow:  115, scorePerBlow: 10, count: 1},
        {maxBlow:  40, scorePerBlow: 40, count: 1},
        {maxBlow:  71, scorePerBlow: 10, count: 1},
        {maxBlow:  93, scorePerBlow: 10, count: 1},
        {maxBlow:  64, scorePerBlow: 40, count: 1},
        {maxBlow:  40, scorePerBlow: 40, count: 1},
        {maxBlow:  17, scorePerBlow: 10, count: 1},
        {maxBlow:  51, scorePerBlow: 10, count: 1},
        {maxBlow:  79, scorePerBlow: 10, count: 1},
        {maxBlow:  42, scorePerBlow: 40, count: 1},
        {maxBlow:  32, scorePerBlow: 40, count: 1},
        {maxBlow:  85, scorePerBlow: 10, count: 1},
        {maxBlow:  71, scorePerBlow: 10, count: 1},
      ]
    },
    {
      title: '真实金钱奖励',
      description: '本轮游戏奖励为真实金钱，请尽可能盈利。点击气球获取真实积分，盈利越多, 获得的实验报酬就越多，实验结束即可获得相应的实验报酬。',
      unit: '分',
      balloons: [
        {maxBlow:  78, scorePerBlow: 40, count: 1},
        {maxBlow:  50, scorePerBlow: 40, count: 1},
        {maxBlow:  25, scorePerBlow: 10, count: 1},
        {maxBlow:  77, scorePerBlow: 10, count: 1},
        {maxBlow:  105, scorePerBlow: 10, count: 1},
        {maxBlow:  95, scorePerBlow: 10, count: 1},
        {maxBlow:  50, scorePerBlow: 40, count: 1},
        {maxBlow:  16, scorePerBlow: 40, count: 1},
        {maxBlow:  125, scorePerBlow: 10, count: 1},
        {maxBlow:  89, scorePerBlow: 10, count: 1},
        {maxBlow:  26, scorePerBlow: 40, count: 1},
        {maxBlow:  90, scorePerBlow: 40, count: 1},
        {maxBlow:  123, scorePerBlow: 10, count: 1},
        {maxBlow:  126, scorePerBlow: 40, count: 1},
        {maxBlow:  82, scorePerBlow: 40, count: 1},
        {maxBlow:  41, scorePerBlow: 10, count: 1},
        {maxBlow:  86, scorePerBlow: 40, count: 1},
        {maxBlow:  72, scorePerBlow: 40, count: 1},
        {maxBlow:  109, scorePerBlow: 10, count: 1},
        {maxBlow:  74, scorePerBlow: 40, count: 1},
        {maxBlow:  102, scorePerBlow: 40, count: 1},
        {maxBlow:  84, scorePerBlow: 40, count: 1},
        {maxBlow:  49, scorePerBlow: 10, count: 1},
        {maxBlow:  42, scorePerBlow: 40, count: 1},
        {maxBlow:  23, scorePerBlow: 10, count: 1},
        {maxBlow:  90, scorePerBlow: 40, count: 1},
        {maxBlow:  75, scorePerBlow: 10, count: 1},
        {maxBlow:  40, scorePerBlow: 40, count: 1},
        {maxBlow:  41, scorePerBlow: 10, count: 1},
        {maxBlow:  115, scorePerBlow: 10, count: 1},
        {maxBlow:  95, scorePerBlow: 10, count: 1},
        {maxBlow:  90, scorePerBlow: 40, count: 1},
        {maxBlow:  115, scorePerBlow: 10, count: 1},
        {maxBlow:  52, scorePerBlow: 40, count: 1},
        {maxBlow:  52, scorePerBlow: 40, count: 1},
        {maxBlow:  24, scorePerBlow: 40, count: 1},
        {maxBlow:  45, scorePerBlow: 10, count: 1},
        {maxBlow:  19, scorePerBlow: 10, count: 1},
        {maxBlow:  49, scorePerBlow: 10, count: 1},
        {maxBlow:  24, scorePerBlow: 40, count: 1},
      ]
    },
  ],
}

const getters = {

}

const actions = {
  setExpSettingList({
    commit
  }, expSettingList) {
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