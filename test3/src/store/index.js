import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo:{}
  },
  mutations: {
    changlogin(state,status){
      state.userInfo=status
    }
  },
  actions: {
    loginAction({commit},user){
      commit('changlogin',user)
    }
  },
  modules: {
  },
});
