<template>
<!-- 这里都需要加判断，因为异步的原因数据加载不同步，如果数据还没渲染就先不显示 -->
  <div class="detail-info-box" v-if="Object.keys(detailinfo).length!==0">
    <div class="title">
      {{detailinfo.title}}
    </div>
    <div class="price">
      <span class="newprice">
        {{'¥'+detailinfo.newPrice}}
      </span>
      <span class="oldprice">
        {{'¥'+detailinfo.oldPrice}}
      </span>
      
    </div>
    <div class="columns">
      <span>{{detailinfo.columns[0]}}</span>
      <span>{{detailinfo.columns[1]}}</span>
      <span>{{detailinfo.services[detailinfo.services.length-1].name}}</span>
    </div>
    <div class="promise">
      <div v-for="item in detailinfo.services.length-2" :key="item" class="psitem">
        <img :src="detailinfo.services[item].icon" alt="">
        <span>{{detailinfo.services[item].name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name :'DetailBaseInfo',
  props: {
    detailinfo:{
      //这里是封装的对象
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .detail-info-box{
    
  }
  .title{
    /* 不给宽度由内容+padding撑开 */
    font-size: 15px;
    height: 40px;
    padding: 10px 10px 0px 10px;
  }
  .price{
    height: 20px;
    padding: 10px ;
  }
    .newprice{
      font-size: 20px;
      color: red;
    }
    .oldprice{
      text-decoration: line-through;/* 实现文字中间的横线 */
      font-size: 8px;
      color: rgb(149, 149, 149);
    }
  .columns{
    display: flex;
    justify-content: space-between;/* flex两端对齐 */
    height: 20px;
    width: 95%;
    margin: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgb(224, 224, 224);
  }
    .columns span{
      font-size: 12px;
      color: rgb(149, 149, 149);
    }
  .promise{
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: rgb(0, 0, 0);
    width: 95%;
    margin: 10px;
    padding-top: 10px;
    padding-bottom: 20px;
    box-shadow: 0px 5px 1px  #e7e7e7;
  }
  .promise img{
    width: 10px;
    height: 10px;
  }
</style>