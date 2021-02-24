<template>
  <div class="commend-img">
   <!--  v-for的key不要指向一个对象或者模糊的东西 -->
    <div v-for="item in childrecommend" :key='item.image' class="item">
      <a :href="item.link">
      <img :src="item.image" alt="">
      <div>{{item.title}}</div>
      </a>
    </div>
   
  </div>
</template>

<script>
export default {
  name:'CommendView',
  props: {
    childrecommend:{
      type:Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .commend-img{
    display: flex;
    text-align: center;
    padding: 10px 0px 10px;
    font-size: 12px;
    border-bottom: 10px solid rgb(219, 219, 219);
  }
  .item{
    flex: 1;
  }
  .item img{
    width: 70px;
    height: 70px;
    margin: 5px auto;
  }
  .item a{
    text-decoration: none;
    color: black;
  }
</style>
  
