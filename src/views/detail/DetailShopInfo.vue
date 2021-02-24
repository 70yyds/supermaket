<template>
  <div class="shopinfo">
    <div class="shop">
        <img :src="shopinfo.logo" alt="">
        <span>{{shopinfo.name}}</span>
    </div>
    <div class="info">
          <div class="left">
                <div class="sell">
                  <div>{{shopinfo.sells}}</div>
                  <div>总销量</div>
                </div>
                <div class="shoucang">
                  <div>{{shopinfo.fans}}</div>
                  <div>全部宝贝</div>
                </div>
          </div>
          <div class="right">
                <div class="one"  v-for="(item,index) in shopinfo.score" :key="index">
                  <span>{{item.name}}</span>
                  <span :class="{'istrue':item.isBetter}">{{item.score}}</span>
                </div>
          </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'DetailShopInfo',
  data () {
    return {
    
    }
  },
  props: {
    shopinfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
  .shopinfo{
    width: 100%;
    height: auto;
    padding-top: 20px;
  }
    .shop{
      display: flex;
      justify-content: space-around;
      width: 30%;
      margin-left: 20px;
    }
      .shop span{
        font-size: 14px;
        padding-top: 3px;
      }
  .info{
    display: flex;
    justify-content: space-between;
    padding-top: 30px;
  }
    .left{
      display: flex;
      justify-content: space-around;
      font-size: 15px;
      width: 48%;
      margin-top: 10px;
      margin-left: 10px;
      padding-right: 13px;
      border-right: 1px solid rgb(163, 163, 163);
    }
    .shoucang:first-child{
      padding-left: 5px;
    }
    .left div{
      margin-top: 5px;
    }
    .right{
      width: 37%;
    }
      .right .one,.two,.three{
        margin-top: 10px;
        font-size: 14px;
      }
      .right span{
        margin-right: 15px;
      }
      .one :nth-child(2){
        color: red;
      }
  .istrue{
    color: green;
  }
  
</style>