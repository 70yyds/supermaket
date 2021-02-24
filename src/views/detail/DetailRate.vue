<template>
  <div class="rate" v-if="Object.keys(detailrate).length !== 0"><!-- 如果没有内容就false不显示 -->
    <div class="ratetop">
      <span>用户评论</span>
      <!-- <span>{{'('+detailrate.cRate+')'}}</span> -->
      <span>更多</span>
    </div>
    <div class="ratemain">
      <div class="user">
        <img :src="detailrate.user.avatar" alt="">
        <span>{{detailrate.user.uname}}</span>
      </div>
      <div class="rateinfo">
        <div class="ratecontent">
          <span>{{detailrate.content}}</span>
        </div>
        <div class="date">
          <span >{{timeConvert(detailrate.created)}}</span>
          <span>{{detailrate.style}}</span>
        </div>
        <div class="rateimg">
          <img :src="item" alt=""  v-for="(item,index) in detailrate.images" :key="index">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'DetailRate',
  data () {
    return {
     
    }
  },
  props: {
    detailrate:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods: {
    //时间戳转换成正常时间格式
     timeConvert(timestamp,num){//num:0 YYYY-MM-DD  num:1  YYYY-MM-DD hh:mm:ss // timestamp:时间戳 
            timestamp = timestamp+'';
            timestamp = timestamp.length==10?timestamp*1000:timestamp;
            var date = new Date(timestamp);
            var y = date.getFullYear();  
            var m = date.getMonth() + 1;  
            m = m < 10 ? ('0' + m) : m;  
            var d = date.getDate();  
            d = d < 10 ? ('0' + d) : d;  
            var h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            var minute = date.getMinutes();
            var second = date.getSeconds();
            minute = minute < 10 ? ('0' + minute) : minute;  
            second = second < 10 ? ('0' + second) : second; 
            if(num==0){
                return y + '-' + m + '-' + d;  
            }else{
                return y + '-' + m + '-' + d +' '+ h +':'+ minute +':' + second;  
            }
}
  }
}
</script>

<style scoped>
  .rate{
    position: relative;
    height: auto;
    padding: 15px;
    padding-top: 25px;
    box-shadow: 0px -5px 1px rgb(228, 228, 228);
  }
  .ratetop{
    padding-bottom: 20px;
    border-bottom: 1px solid rgb(184, 184, 184);
  }
    .ratetop :nth-child(2){
      position: absolute;
      right: 20px;
    }
  .ratemain{
    margin-top: 10px;
    padding-bottom: 20px;
    box-shadow: 0px 5px 0px rgb(226, 226, 226);
  }
    .ratemain .user span{
      font-size: 16px;
      margin-left: 10px;
    }
    .rateinfo{
      font-size: 15px;
      margin-top: 20px;
    }
    .date{
      color: gray;
      font-size: 13px;
      margin-top: 10px;
    }
    .date span{
      margin-right: 15px;
    }
    .rateimg{
      width: 98%;
      height: auto;
      margin-top: 10px;
    }
    .rateimg img{
      width: 20%;
      height: auto;
      margin-right: 10px;
    }
</style>