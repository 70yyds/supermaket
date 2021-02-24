//debounce 防抖    throttle节流
//写了这个功能之后refresh()不会每张图就调用一个，而是以一个延迟后的状态调用，减小服务器的压力
//定义一个防抖方法，之后在mixin的mounted中的scroll refresh刷新功能中调用

//定义debounce方法，并进行传值，这里传的是一个函数和时间延迟，之后会在mixin中调用
export function debounce(func, delay) {
  let timer = null;

  return function(...args) {
    /* ...args代表可以传很多次 */
    if (timer) clearTimeout(timer);//如果time存在，则timer
    timer = setTimeout(() => {
      /*settimeout中的内容是最后执行的，所以就算不设置事件也会有一些节流 */
      func.apply(this, args);//apply的定义自行百度
    }, delay);
  };
}
