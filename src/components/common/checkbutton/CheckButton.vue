<template>
  <div class="cb" :class="{check: ischecked}">
    <img src="~assets/img/选中.svg" alt="" >
  </div>
</template>

<script>
export default {
  name:'CheckButton',
  data () {
    return {
    }
  },
  props: {
    //这里的true/false应该是由模型里驱动的，而不是页面上修改
    ischecked:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
.check{
  background-color: rgb(255, 110, 134);
  border-color: rgb(255, 110, 134);
}
  .cb{
      border: 1px solid #aaa;
    }
  .cb img{
    width: 100%;
    height: 100%;
  }
</style>