import axios from "axios";
//返回一个带参方法
export function request(config) {
  //实例一个对象
  const instance = axios.create({
    baseURL: "http://152.136.185.210:7878/api/m5",
    timeout: 5000
  });
  //axios实例拦截器   请求拦截     全局为axios.interceptors.request
  instance.interceptors.request.use(
    config => {
      return config; //拦截器拦截之后需要返回数据，否则回调时catch不到
    },
    err => {
      /*  console.log(err); */
    }
  );
  //响应拦截
  instance.interceptors.response.use(
    res => {
      /* console.log(res); */
      return res.data;
    },
    err => {
      console.log(err);
    }
  );
  //这里本身需要返回一个promise函数，但是因为axios实例本身就是promise所以这里可以直接return
  return instance(config);
}
