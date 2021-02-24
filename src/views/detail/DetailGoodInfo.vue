<template>
  <div class="goods" v-if="Object.keys(goodinfo).length !== 0">
    <div class="box">
      <div class="start">
        <img src="~assets/img/mufes.png" alt="">
      </div>
      <div class="desc">{{goodinfo.desc}}</div>
      <div class="end">
         <img src="~assets/img/mufes.png" alt="">
      </div>
    </div>
    <div class="text">
      {{goodinfo.detailImage[0].key}}
    </div>
    <div class="goodimg">
      <img :src="item" alt="" 
      v-for="(item,index) in goodinfo.detailImage[0].list" :key="index"
      @load="imgload()">
    </div>
  </div>
</template>

<script>
export default {
  name:'DetailGoodInfo',
  data () {
    return {
      counter:0,
      imglength:0
    }
  },
  props: {
    goodinfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods: {
    //这一步是为了实时刷新图片，否则图片加载的慢，scroll初始的高度就被定住了，不能滚动了
    imgload(){
      if(++this.counter === this.imglength){
        this.$emit('imageload')
      }
    }
  },
  watch: {
    goodinfo(){
      this.imglength=this.goodinfo.detailImage[0].list.length
    }
    
  }
}
</script>

<style scoped>
  .goods{
    margin-top: 20px;
    padding-bottom: 20px;
    box-shadow: 0px 5px 1px rgb(218, 218, 218);
  }
  .box .desc{
    padding: 20px;
    font-size: 15px;
  }
  .start img{
    width: 100px;
    height: 20px;
    margin-left: 10px;
  }
  .end img{
    width: 100px;
    height: 20px;
    margin-left: 270px;
  }
  .text{
    margin-left:20px;
    margin-bottom: 20px;
  }
  img{
    width: 100%;
    height: auto;
  }
</style>