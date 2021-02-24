<template>
  <div class="nav">
    <navbar>
      <div slot="left" class="left">
        <span @click="back()">返回</span>
      </div>
      <div slot="center" class="center">
        <div v-for="(item,index) in title" 
            :key="index" 
            class="itemtitle"
            @click="itemclick(index)"
            :class="{clickred:index===currentindex}">
          {{item}}
        </div>
      </div>
      <div slot="right" class="right">
      </div>
    </navbar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name:'DetailNavBar',
  data () {
    return {
      title:['商品','参数','评论','推荐'],
      currentindex:0
    }
  },
  components: {
    navbar:NavBar
  },
  methods: {
    //返回上一页
    back(){
      this.$router.back(-1);
    },
    //拿到当前点击的index
    itemclick(index){
      this.currentindex=index;
      this.$emit('itemclick', index)
    }
  }
}
</script>

<style scoped>
.nav{
  background-color: rgb(240, 240, 240);
}
 .center{
   display: flex;
   
   color: rgb(136, 136, 136);
   font-size: 13px;
 }
 .itemtitle{
   flex: 1;
 }
 .clickred{
   color: red;
 }
</style>