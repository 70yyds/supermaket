import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
Vue.use(Vuex);
const state = {
  cartList: []
};
const store = new Vuex.Store({
  //vuex的各状态可以单独封装成一个js文件，getter专门储存计算属性，mutation储存单一类型的功能，state等都可以抽离
  state,
  mutations,
  actions,
  getters
});
//挂载到main.js
export default store;
