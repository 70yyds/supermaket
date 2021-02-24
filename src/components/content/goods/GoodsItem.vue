<template>
  <div class="goods-item" @click="itemclick">
    <img :src="showimg" alt="" @load="imageLoad()"><!-- vue的原生load监听方法 -->
    <div class="goods-info">
      <p>{{goodsitem.title}}</p>
      <span class="price">{{"$"+goodsitem.price}}</span>
      <span class="collect">{{goodsitem.sale}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name :"GoodsItem",
  props: {
    goodsitem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  computed: {
    //这里由于goodlist被两个组件引用，这两个组件的接口数据路径不一样，所以要在这里做一个判断
    //并且在操作顺序性上是后面的组件的判断要写在前面，这里拟为A，B。
    //因为A先引用的所以会进来会先判断，而第一个判断的是B的条件，所以为false，下顺到A的判断，程序正常进行，以此类推 
    showimg(){
      return this.goodsitem.image ||  this.goodsitem.show.img 
    }
  },
  methods: {
    imageLoad(){
      this.$bus.$emit('itemImageLoad')
    },
    itemclick(){
      //通过gooditem 因为goodlist中有home传递的数据拿到对应商品的id push
      this.$router.push('/Detail/'+this.goodsitem.iid)
    }
  }
}
</script>

<style scoped>
  .goods-item{
    padding-bottom: 40px;
    width: 43%;
    
    position: relative;
  }
  .goods-item img {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }
  .goods-info{
    font-size: 13px;
    position: absolute;
    bottom:5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p{
    /*超出文本显示省略号 */
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 5px;
  }
  .goods-info .price{
    margin-right: 15px;
    
    color: red;
  }
  .goods-info .collect{
    position: relative;
  }
  .goods-info .collect::before{
    content: '';/*使用::伪类必须要加一个content */
    position: absolute;
    left: -14px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/collect.svg") 0 0/14px 14px;
  }
</style>