import { ADD_COUNTER, ADD_TO_SHOP } from "./mutation-types";

export default {
  //这里本来是addcounter(){},addtoshop(){}
  //但是重命名之后，书写规则有一点变化
  [ADD_COUNTER](state, payload) {
    payload.count++;
  },
  [ADD_TO_SHOP](state, payload) {
    payload.checked = true;
    state.cartList.push(payload);
  }
};
