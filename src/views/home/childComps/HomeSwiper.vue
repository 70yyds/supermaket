<template>
  <div>
  <swiper>
      <swiperitem v-for="item in childbanners" :key="item.image">
        <a :href="item.link">
          <img :src="item.image"  class="pic" @load="imgLoad"><!-- 监听加载事件 -->
        </a>
      </swiperitem>
    </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
 
export default {
  name:'HomeSwiper',
  components: {
    swiper:Swiper,
    swiperitem:SwiperItem
  },
  data () {
    return {
      isLoad:false
    }
  },
  props: {
    childbanners:{
      type:Array,
      default(){
        return []
      }
    }
    
  },
  methods: {
    imgLoad(){
      if(!this.isLoad){
        this.$emit('swiperimgLoad')
        //判定是否发送了，发送后就不发送了，只发送一次就行
        this.isLoad=true
      }
    }
  }
}
</script>

<style scoped>
   .pic{
    height: 100%;
    
  }
</style>