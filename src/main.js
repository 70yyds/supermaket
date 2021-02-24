import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";

//使用toast需要先在入口这里加载
import toast from 'components/common/toast'

Vue.config.productionTip = false;

Vue.prototype.$bus = new Vue(); //定义一个原型，作为事件总线  之后就可以使用$bus.on /off,纯工具中转站
//安装
Vue.use(toast)

new Vue({
  router,
  //将store挂载到实例
  store,
  render: h => h(App)
}).$mount("#app");
