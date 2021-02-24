<template>
  <div class="bottombar">
    <div class="left">
      <div class="button">
        <check-button
          class="checkbutton"
          :ischecked="isSelectAll"
          @click.native="checkAll"
        />
        <span>全选</span>
      </div>
      <div class="totle">合计：{{ totleprice }}</div>
    </div>

    <div class="right">
      <div class="tocount" @click="calcClick">去计算:{{ checkedlength }}</div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/common/checkbutton/CheckButton";

import { mapGetters } from "vuex";
export default {
  name: "ShopBottomBar",
  data() {
    return {
      totle: 0,
    };
  },
  components: {
    CheckButton,
  },
  methods: {
    checkAll() {
      //这里逻辑是根据isSelect的状态决定的，因为刚开始到购物车，是自动选中状态，所以此时点击是全不选中
      if (this.isSelectAll) {
        return this.shopList.forEach((item) => (item.checked = false));
      } else {
        return this.shopList.forEach((item) => (item.checked = true));
      }
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show("请先选择商品", 2000);
      }
    },
  },
  computed: {
    ...mapGetters(["shopList"]),
    totleprice() {
      //filter筛选，然后reduce执行相关语句，tofixed取2位小数
      return this.shopList
        .filter((item) => {
          return item.checked; //条件
        })
        .reduce((preValue, item) => {
          return preValue + item.price * item.count; //功能语句  累加
        }, 0)
        .toFixed(2);
    },
    checkedlength() {
      return this.shopList.filter((item) => item.checked).length;
    },
    //判断全选按钮的状态   这个逻辑很重要，以后工作可能会用到
    isSelectAll() {
      //为空的逻辑
      if (this.shopList.length === 0) {
        return false;
      }
      //有数距时候的逻辑
      return !this.shopList.find((item) => !item.checked);
    },
  },
};
</script>

<style scoped>
.bottombar {
  position: absolute;
  bottom: 50px;
  width: 100%;
  height: 30px;
  color: rgb(126, 126, 126);
  display: flex;
}
.left {
  display: flex;
  width: 70%;
  background-color: rgb(207, 207, 207);
}
.left .checkbutton {
  border-radius: 25px;
  width: 18px;
  height: 18px;
  margin-top: 3px;
  margin-left: 10px;
}
.left .button {
  display: flex;
}
.left .button span {
  margin-left: 5px;
  padding-top: 5px;
}
.left .totle {
  margin-left: 20px;
  width: 60%;
  padding-top: 5px;
}
.right {
  width: 30%;
  height: 100%;
  position: absolute;
  right: 0px;
  color: white;
  background-color: red;
}
.right .tocount {
  padding: 5px 10px;
}
</style>