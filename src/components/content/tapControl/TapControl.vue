<template>
  <div id="tapcontrol">
    <div v-for="(item,index) in tapcontrol" :key="item" class="item"
     @click="getIndex(index)"
     :class="{active:index===currentindex}"><!-- 点击谁就把样式赋予给谁，初始为0 -->
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
//这个页面实现流行 新款 精选的跳转
export default {
  name :'TapControl',
  props: {
    tapcontrol:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data () {
    return {
      currentindex:0
    }
  },
  methods: {
    //通过点击获取对应的索引
    getIndex(index){
      this.currentindex=index;//要把这个index发射出去完成切换页面的功能
      this.$emit('typecontrol',index);
    }
  }
}
</script>

<style scoped>
  #tapcontrol{
    display: flex;
    text-align: center;
    font-size: 13px;
    height: 40px;
    line-height: 40px;
    background-color: rgb(255, 255, 255);
    z-index: 9;
  }
  .item{
     flex: 1;
    
  }
  .item span{
    padding: 7px;
    
  }
  .active span{
    border-bottom: 2px solid rgb(253, 102, 127);
    color: rgb(253, 102, 127);
  }
</style>