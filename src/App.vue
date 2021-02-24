<template>
  <div id="app">
     <main-tabbar></main-tabbar>
     <!-- 这里排除detail，否则会一直显示同一个数据 -->
      <keep-alive exclude="Detail">
        <router-view></router-view> 
      </keep-alive>  
  </div>
</template>
<script>
import mainTabbar from 'components/content/mainTabbar'
 
export default {
  name:'App',
  components: {
    mainTabbar,
  }
}
</script>
<style>
@import './assets/css/base.css';
 
</style>
