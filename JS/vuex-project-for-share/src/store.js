import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {//data
    allUsers:[
      {userId: 'hoza123', password: '123', name: 'Hoza', address: 'Seoul', src:'https://goo.gl/oqLfJR'},
      {userId: 'max123', password: '456', name: 'Max', address: 'Berlin', src:'https://goo.gl/Ksk9B9'},
      {userId: 'lego123', password: '789', name: 'Lego', address: 'Busan', src:'https://goo.gl/x7SpCD'}
    ]
  },
  getters: {
    //computed의 역할을 함
    allUserCount(state) {
      return state.allUsers.length
    },
    countOfSeoul(state) {
      let count = 0
      state.allUsers.forEach(user => {
        if (user.address === 'Seoul') {
          count++
        }
      })
      return count 
    },
    percentOfSeoul(state, getters) {
      //무조건 state가 처음 쓰여야함
      return Math.round(getters.countOfSeoul / getters.allUserCount) 
    }
  },
  mutations: {
    addUsers(state,payload) {
      // 통상적으로 payload로 넘어옴
      state.allUsers.push(payload)
    } 
  },
  actions: {
    addUsers({commit}, payload) {
      commit('addUsers',payload)
      //보통 여기서 로그인 로직을 처리함
    }
  }
})
