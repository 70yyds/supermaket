//mixin 混入，vue的高级语法
//它可以免去大量重复的代码
//使用时引用后，在组件中添加 Mixin[方法名] 即可添加mixin中写好的内容
//它不仅可以混入生命周期函数，created，destroy，mounted等，它甚至可以混入data，methods等等

//而这个项目目前使用混入的目的是，因为goodsitem.vue中，imageLoad方法中的$bus的原因
//由于项目中home和detail两个都用到了goodslist，所以自然牵扯到godditem的商品图片加载问题，而图片加载问题又会影响到scroll的刷新方法
//当在detail中点击商品推广的内容时，$bus.on会发射一个函数，按理说应该是只发射到发生点击的页面中，但事实是由于引用问题，会发射到所有引用他的界面里，所以home也受到了影响
//这里home为了不受其影响，在deactived中设置了'不活跃时就关掉imageLoad'的状态，即$bus.off('imagLoad')
//其他内容就是detail和home都引用了minxin

//监听gooditem中图片加载完成
import { debounce } from "./utils";
//这个方法写的位置在数据加载之前较好，当组件挂在上的时候就调用这个方法
export const itemListenerMinxin = {
  data() {
    return {
      itemImgListener: null
    };
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 100);
    this.itemImgListener = () => {
      refresh();
    };
    //$bus 是在main.js中定义好的，使用它的原因是因为组件与组件之间的关系隔级了，父子孙，但是有功能需要实现事件监听，因此通过定义事件总线的方式来联系他们
    //这里联系了gooditem和home/detail。用来监听图片加载事件
    //采用在main.js中定义的事件总线的方式，联系gooditem组件和home组件，跨级
    //这里传的两个值有一段时间纠结了一段时间，不知道是什么关系，后来看原来的视频发现，其实只是通过$bus监听的一个事件，前面是事件名，后面是事件体

    this.$bus.$on("itemImageLoad", this.itemImgListener);

    /* this.tapoffSetTop=this.$refs.tapControl.$el.offsetTop;
    console.log(this.tapoffSetTop); */
  }
};
import BackTop from 'components/content/BackTop'
export const backtopmixin={
  data () {
    return {
      isShowbackTop:false,
    }
  },
  components: {
    BackTop
  },
  methods: {
    backtop(){
      //先通过refs拿到scroll组件，然后调用scroll组件里的scroll属性对象
      /* this.$refs.scroll.scroll.scrollTo(0,0,500) *///其实这种方法已经可以完成返回顶部的功能，但可以在scroll组件中定义方法再调用
      this.$refs.scroll.scrollTo(0,0,500);
    },
  }
}
