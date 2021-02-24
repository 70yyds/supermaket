<template>
  <!-- tabbar组件只需要定义大的边框样式，不用考虑内部小组件的渲染，小组件交给APP渲染 -->
    <div id="tabbar">
      <slot></slot>
    </div>
   
</template>

<script>
export default {
  name:'Tabbar'
}
</script>

<style>
 
#tabbar {
  display: flex;
  background-color: rgb(240, 240, 240);
  position: fixed;
  left: 0px;
  right: 0;
  bottom: 0;
  box-shadow: 1px 10px 10px 10px rgba(0,0,0,.1);
  font-size: 13px;
}
</style>