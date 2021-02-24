<template>
  <div>
    <img src="~assets/img/arrowUpCircle.svg" alt="">
  </div>
</template>

<script>
export default {
  name :'BackTop'
}
</script>

<style scoped>
  img{
    position: fixed;
    right: 15px;
    bottom: 60px;
    width: 50px;
    height: 50px;
    background-color: white;
    border-radius: 40px;
    z-index: 9;
  }
</style>