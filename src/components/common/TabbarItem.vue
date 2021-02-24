<template>
<!-- 这里定义了一个tabbaritem组件，是一个可以复用的小组件，为了确保其可复用性，因此不会在里面写死内容 -->
  <div class="tab-bar-item" @click="click()">
      <!-- 这里每个插槽都包装一下div，避免替换的时候绑定的东西出现错误 -->
      <div v-if="!isActive">
        <slot name="item-icon"></slot>
      </div>
      <div v-else>
        <slot name="item-icon-active"></slot>
      </div>
      <div :style='activeStyle'>
        <slot name="item-text"></slot>
      </div>
  </div>
</template>

<script>
export default {
  name:'TabbarItem',
  //绑定到父上后，向子传递数据，在子中定义接收类型
  props: {
    path:String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
   
  computed: {
    isActive(){
      //indexOf可以检索括号里的对象是否出现，如果要检索的字符串值没有出现，则该方法返回 -1
      //找到的时候是true，没找到返回-1
      //这个计算属性可以看是否是活跃状态
      return this.$route.path.indexOf(this.path)!==-1//当为等式的时候return的就是ture或false
    },
    activeStyle(){
      return this.isActive?{color:this.activeColor}:{}
    }
  },
  methods: {
    click () {
      //这里的path是通过父组件传回来的，添加了catch函数不会报错，原理未知es6写法catch(err=>err)
      this.$router.push(this.path)
      
    }
  },
   
}
</script>

<style>

.tab-bar-item{
  flex:1;/* 均等分 */
  text-align: center;
  height: 47px;
}
/* 需要考虑一下插槽替换后的样式问题 */
img{
  width:24px;
  height: 24px;
}

/* 
  封装的内容属性一般不写死，交给使用者决定，所以通过app传值来决定什么颜色
.active{
  color: red;
} */
</style>