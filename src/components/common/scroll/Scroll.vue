<template>
  <!-- ref属性一般帮给子组件 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core/dist/core'
import Pullup from '@better-scroll/pull-up/dist/pull-up'

BScroll.use(Pullup)
/* 滚动要素
    父容器高度固定之后
    子容器高度要大于父容器
    而vue的数据请求伴随着延迟，所以非常容易在数据请求出来之前scroll组件就已经加载好了，此时子容器高度就会不足，因此会出现不能滑动的bug
    所以scroll组件的refresh()方法实时刷新非常重要 */
export default {
  name : 'Scroll',
  data () {
    return {
      scroll:null,

    }
  },
    props: {
      //这个值最好通过调用的页面传值过来
      probetype:{
        type:Number,
        default:0
      },
      pullingup:{
        type:Boolean,
        default:false
      }
    },
    mounted () {
      
        //初始化一个betterscroll
        this.scroll = new BScroll(this.$refs.wrapper,{
          click:true,
          disableTouch:false,
          disableMouse:false,
          probeType:this.probetype,
          pullUpLoad:this.pullingup
        }) 
       /*  console.log(this.scroll); */
        //监听页面的位置  0/1是没必要的监听的
        if(this.probetype===2 || this.probetype===3 ){
          this.scroll.on('scroll',position=>{
          this.$emit('scPosition',position)//发射给home  position
        })
        }
        //监听上拉事件
        this.scroll.on('pullingUp',()=>{
          this.$emit('pullingup')
        })
      
     
    },
    methods: {
      scrollTo(x,y,time){
        this.scroll && this.scroll.scrollTo(x,y,time)//scrollTo是Bs中一个方法
      },
      //上拉加载完成的方法
      finishpullup(){  
        this.scroll.finishPullUp();//finishPullUp是BS中的一个默认方法
      },
      //实时刷新
      refresh(){
          this.scroll && this.scroll.refresh();
      }
    }
  }
  

</script>

<style scoped>
  
</style>