<template>
  <div class="box">
    <scroll ref="scroll" :pullingup="pullUp">
      <!-- 注意这里传值传的是item，刚开始传的是shoplist，而shoplist是数组类型，吃过大亏,item是shoplist里的一个对象  -->
      <shop-good-item
        v-for="(item, index) in shopList"
        :key="index"
        :product="item"
      />
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import ShopGoodItem from "./ShopGoodItem.vue";
import { mapGetters } from "vuex";
export default {
  name: "ShopList",
  data() {
    return {
      pullUp: true,
    };
  },
  components: {
    Scroll,
    ShopGoodItem,
  },
  computed: {
    //这两种方式获取数据都可以，第一种结构明了，第二种比较好理解
    /* ...mapGetters(['shopList']) */
    shopList() {
      return this.$store.state.cartList;
    },
  },
  activated() {
    this.$refs.scroll.refresh(); //刷新一下scroll
  },
};
</script>

<style scoped>
.box {
  height: 100vh;
}
.wrapper {
  /* 减掉了顶部和底部的bar */
  height: calc(100% - 44px - 50px - 30px);
  overflow: hidden;
}
</style>