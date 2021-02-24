<template>
  <swiper class="box">
    <swiper-item v-for="item in detailswiperimg" :key="item" class="swiperimg">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
  name: 'DetailSwiper',
  data () {
    return {
      
    }
  },
  components: {
    Swiper,
    SwiperItem
    
  },
  props: {
    detailswiperimg:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
  .box{
    height: 400px;
    overflow: hidden;
  }
  .swiperimg img{
    height: 100%;
    width: 100%;
  }
</style>