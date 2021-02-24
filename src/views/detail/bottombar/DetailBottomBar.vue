<template>
  <div class="bottom">
    <div class="left">
      <div class="left-kf" >
        <img src="~assets/img/bottombar/kf.svg" alt="">
        <span>客服</span>
      </div>
      <div class="left-xh" >
        <img src="~assets/img/bottombar/dp.svg" alt="">
        <span>店铺</span>
      </div>
      <div class="left-sc" >
        <img src="~assets/img/bottombar/sc.svg" alt="">
        <span>收藏</span>
      </div>
    </div>
    <div class="right">
      <div class="right-shop" @click="addshopcar()">
        <span>加入购物车</span>
      </div>
      <div class="right-buy">
        <span>购买</span>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name :'DetailBottomBar.vue',
  data () {
    return {
    }
  },
  methods: {
    addshopcar(){
      this.$emit('addshopcar')
    }
  }
}
</script>

<style scoped>
 .bottom{
   display: flex;
   position: fixed;
   bottom: 0;
   left: 0;
   width: 100%;
   height: 50px;
 }
 .left,.right{
   display: flex;
   flex: 1;
   font-size: 13px;
 }
    .left-kf,.left-xh,.left-sc{
      width: 33%;
      text-align: center;
      padding-top: 3px;
    }
    .left-kf span,.left-xh span,.left-sc span{
      display: block;
    }
 
 
    .right-shop{
      background-color: rgb(255, 142, 50);
    }
    .right-buy{
      background-color: rgb(255, 90, 90);
    }
    .right-shop,.right-buy{
      flex: 1;
      color: white;
      text-align: center;
      line-height: 50px;
    }

  .red{
    color: red;
  }
</style>