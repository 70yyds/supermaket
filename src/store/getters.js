export default {
  shoplength(state) {
    return state.cartList.length;
  },
  shopList(state) {
    return state.cartList;
  }
};
//getters一般存放的都是不用修改数据的计算属性，需要把state传入，并返回。 通过...mapgetters[('')]取出
//其实getters中的语句，在各组件中也能实现就是this.$store.state
