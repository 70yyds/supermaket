<template>
  <div class="goods">
     <goodsitem v-for="(item,index) in goodslist" :key="index" class="gooditem" :goodsitem=item></goodsitem>
  </div>
</template>

<script>
//注意这里的组件关系是父子树关系，在传递参数的时候要绑定的对象也不一样
//比如goodslist再给goodsitem传参的时候，goodsitem绑定的是list循环中的item，这层逻辑
//在遍历的时候也只需要循环一个list组件框，item子组件只需要要填内容，会在父组件里自动遍历出来
import GoodsItem from 'components/content/goods/GoodsItem'

export default {
  name:'GoodssList',
  components: {
    goodsitem:GoodsItem
  },
  props: {
    goodslist:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
   .goods{
     display: flex;
     flex-wrap: wrap;/* 默认不包裹，会在一行显示，wrap改为包裹 */ 
     justify-content: space-around;
     padding-right: 15px;
   }
   .gooditem{
     margin-left: 20px;
     margin-top: 20px;
   }
</style>