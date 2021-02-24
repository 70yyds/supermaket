<template>
  <div>
    <nav-bar class="top">
      <div slot="center" class="center">
        <span>购物街({{ length }})</span>
      </div>
    </nav-bar>
    <shop-list />
    <shop-bottom-bar></shop-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import ShopList from "./ShopList.vue";
import ShopBottomBar from "./ShopBottomBar.vue";

import { mapGetters } from "vuex";
export default {
  name: "Shop",
  data() {
    return {};
  },
  components: {
    NavBar,
    ShopList,
    ShopBottomBar,
  },
  computed: {
    ...mapGetters({
      length: "shoplength",
    }),
  },
};
</script>

<style scoped>
.top {
  width: 100%;
  background-color: rgb(255, 109, 133);
}
.center {
  width: 100%;
  color: #fff;
}
</style>