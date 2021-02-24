import Toast from "./Toast.vue";

//创建一个对象容器
const obj = {};
obj.install = function(Vue) {
  /* document.body.appendChild(Toast,$el) */
  //创建组件构造器
  const toastContrustor = Vue.extend(Toast);
  //创建一个组件对象
  const toast = new toastContrustor();
  //将组件对象，手动挂在到一个元素上
  toast.$mount(document.createElement("div"));
  //toast.$el对应div
  document.body.appendChild(toast.$el);

  Vue.prototype.$toast = toast;
};
export default obj;
