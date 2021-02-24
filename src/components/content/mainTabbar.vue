<template>
   
   <tabbar id="tabbar">
          <!-- 这里挂在并渲染了四个可复用tabbaritem组件，并使用命名插槽指定替换的内容 -->
          <tabbaritem path='/Home' activeColor='red'>
            <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
            <img slot="item-icon-active" src="~assets/img/tabbar/home-active.svg" alt="">
            <div slot="item-text">首页</div>
          </tabbaritem>
          <tabbaritem path="/Category" activeColor='red'>
            <img slot="item-icon"  src="~assets/img/tabbar/detail.svg" alt="">
            <img slot="item-icon-active"  src="~assets/img/tabbar/detail-active.svg" alt="">
            <div slot="item-text">分类</div>
          </tabbaritem>
          <tabbaritem path="/Shop" activeColor='red'>
            <img slot="item-icon"  src="~assets/img/tabbar/YUAN.svg" alt="">
            <img slot="item-icon-active"  src="~assets/img/tabbar/YUAN-active.svg" alt="">
            <div slot="item-text">购物车</div>
          </tabbaritem>
          <tabbaritem path='/Profile' activeColor='red'>
            <img slot="item-icon"  src="~assets/img/tabbar/user.svg" alt="">
            <img slot="item-icon-active"  src="~assets/img/tabbar/user-active.svg" alt="">
            <div slot="item-text">我的</div>
          </tabbaritem>
   
     </tabbar>
</template>

<script>
import Tabbar from 'components/common/Tabbar'
import TabbarItem from 'components/common/TabbarItem'

 
 
export default {
 name:'mainTabbar',
 components: {
    //挂载tabbar和tabbaritem组件，耐人寻味的是，他们两个并没有父子关系，他们都是app的子组件，只是各司其职
    tabbar:Tabbar,
    tabbaritem:TabbarItem,
  }
}
</script>

<style>
 #tabbar{
   z-index: 9;
 }
</style>