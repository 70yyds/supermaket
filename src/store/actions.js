import { ADD_COUNTER, ADD_TO_SHOP } from "./mutation-types";

export default {
  //注意，mutations中的参数是(state，payload)，而actions的参数(context，payload)
  //mutations的外部调用方式this.$store.commit  ，actions是 .dispatch
  //mutations是映射到computed，actions映射到methods
  addshop(context, payload) {
    //promise的两个参数，其实就是回调时的then和catch
    return new Promise((resolve, reject) => {
      //1 查找之前商品中是否有此商品，find为数组的一个方法 数组的方法还有很多 join/sort/push/reverse/find/shift/reduce/pop/map等
      let oldProduct = context.state.cartList.find(
        item => item.iid === payload.iid
      );

      //如果有，就+1    如果没有，就把从detail传递过来的payload.count+1，并更新数组
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct);
        resolve("再次购买了此商品");
      } else {
        payload.count = 1;
        //这里的mutations入口函数本身应该为 “addshop”，加引号的，
        context.commit(ADD_TO_SHOP, payload);
        resolve("成功加入购物车");
      }

      //其实这里可以把功能写完，但是考虑到vue的使用规范，建议把功能写在actions中，mutations也可以写，但是最好写同一种单调的功能
      //比如，这里的commit就是联系的mutations中的语句，这样分割开来管理
    });
  }
};
