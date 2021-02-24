<template>
  <div id="home">
    <navbar id="navbar">
      <img src="~/assets/img/home/navbar/menu.svg" alt="" class="left-icon" slot="left"> 
      <span class="home-page-navbar" slot="center">购物街</span>
      <img src="~/assets/img/home/navbar/search.svg" alt="" class="right-icon" slot="right"> 
    </navbar>
    <!-- 这里多放了一个tapcontrol用来完成吸顶效果  scroll组件里的tapbar是依然会上滚的的，只是把隐藏的这个显示了出来
    1 先通过v-show来控制是否显示，避免刚开始下拉和刷新的时候暴露，通过滑动的位置来改变fixed，进而改变v-show
      至于位置，其实就在购物街下面，利用wrapper样式和show的判定而已
    -->
    <tapcontrol :tapcontrol="['流行','新款','精选']" 
                ref="tapControl2"
                @typecontrol='typeclick' 
                class="tabhidden" 
                v-show="isfixed"/>

     <!-- 在这里把子组件的bannerdata绑定父组件的banner   下面同理-->
     <!-- 加ref，这样在下面的方法中可以获取到scroll组件，并访问scroll组建的属性 --> 
    <scroll ref="scroll" :probetype="3" :pullingup="pullUp" @scPosition="contentposition" @pullingup="LoadMore">  
            <homeswiper :childbanners=banners @swiperimgLoad="imgLoad" />
            <commendview :childrecommend=recommends />
            <futureview />
            <tapcontrol :tapcontrol="['流行','新款','精选']" 
                        ref="tapControl1"
                        @typecontrol='typeclick'/>
            <goodsslist :goodslist="showGoods" />
    </scroll>
    <back-top  @click.native="backtop" v-show="isShowbackTop" />
  </div>
</template>

<script scoped>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from 'views/home/childComps/HomeSwiper'
import CommendView from './childComps/CommendView'
import Futureview from './childComps/Futureview'
import TapControl from 'components/content/tapControl/TapControl'
import {getHomeMutidata,getHomeGoods} from 'network/home'
import GoodssList from 'components/content/goods/GoodssList'
import Scroll from 'components/common/scroll/Scroll'
import {itemListenerMinxin,backtopmixin} from 'common/mixin.js'
import {debounce} from 'common/utils.js'

export default {
  name:'Home',
  components: {
    navbar:NavBar,
    homeswiper:HomeSwiper,
    commendview:CommendView,
    futureview:Futureview,
    tapcontrol:TapControl,
    goodsslist:GoodssList,
    scroll:Scroll,
    isShow:false,

  },
  mixins: [itemListenerMinxin,backtopmixin],
  data () {
    return {
      data:[], 
      banners:[],
      recommends:[],
      title:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currenttype:'pop',//初始化首页商品为流行页面，通过swich切换
      tapoffSetTop:0,
      isfixed:false,
      pullUp:true,
      saveY:0
    }
  },
  computed: {
      showGoods(){
        return this.goods[this.currenttype].list
      }
  },
  created () {
    //调用封装好的方法请求多个数据
    this.getHomeMutidata();
    //调用封装好的方法请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
    console.log('home created');
  },
  /* destroyed () {
    console.log('home destroyed');
  }, */
  activated () {
    //因为首页有轮播图，所以页面数据的变动使better-sceoll的transform变为0。这里加个定时器
    setTimeout(() => {
      this.$refs.scroll.scrollTo(0,this.saveY,0);//回调当前的scrolly
    }, 0);
    
    this.$refs.scroll.refresh();//刷新一下scroll
  },
  deactivated () {
    this.saveY=this.$refs.scroll.scroll.y;//离开前记录当前的scrolly
    /* console.log(this.saveY+'/leave'); */
  },
  methods: {
    //获取首页 流行 新款 精选跳转索引  索引由tabcontrol子组件发射来的
    typeclick(index){
      /* console.log(index); */
       switch (index) {
        case 0:
          this.currenttype='pop'
          break;
        case 1:
          this.currenttype='new'
          break;
        case 2:
          this.currenttype='sell'
          break;
      }
      //因为有两个tabcontrol，所以他们的index要一致才不会出现bug
      this.$refs.tapControl1.currentindex=index;
      this.$refs.tapControl2.currentindex=index;
    },
    //一键回顶
    /* backtop(){
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    }, */
    //判断当前的位置，辅助回到顶部功能和tabbar吸顶的功能
    contentposition(position){
     /*  console.log(position.y); */
      //判断backtop是否显示
      this.isShowbackTop=(-position.y) > 1000

      //tapcontrol是否吸顶显示 这里巧妙地用了一个比较以此来判断isfixed的true和false
      this.isfixed=(-position.y)>this.tapoffSetTop
    },
    imgLoad(){
      //$el可以获取对应组件的元素
      this.tapoffSetTop=this.$refs.tapControl1.$el.offsetTop;
      console.log(this.tapoffSetTop);
    }, 
    //子组件发射出来绑定后的  上拉加载更多
    LoadMore(){
      this.getHomeGoods(this.currenttype);//调用这个方法，但是还需要在用finishPullUp方法来完成一次完整独立的调用
    },
    //封装getHomeMutidata   轮播图，banner等数据获取
    getHomeMutidata(){
      getHomeMutidata().then(res=>{//函数执行之后数据会被弹出消失，所以数据需要保存
      //可以通过devtools观察是否取回数据，取回之后赋值保存
       this.data=res.data;
      this.banners=res.data.banner.list;
      this.recommends=res.data.recommend.list;
      })
    },
    
    //首页商品获取（形参）  此方法是回调的network中home.js的封装函数
    getHomeGoods(type){
      //这里type不要写死，写成type可以回调pop news sell三种复用
      const page=this.goods[type].page+1;//有页面的时候一定是第一页
        getHomeGoods(type,page).then(res=>{
          //这里有一个逻辑   由于页面是实时保存的，所以新数据数组不能单纯赋值，因为赋值会覆盖原数据
          this.goods[type].list.push(...res.data.list)//...res.data.list是一种数组语法，需要百度了解一下。   获取商品数据
          this.goods[type].page+=1;
          /* console.log(res); *///这里可以看到每个商品都有自己的iid

          this.$refs.scroll.finishpullup();//完整的完成一次上拉加载，这个很重要
      })
    },
    
  },
  mounted () {
    
  }
  
}
</script>

<style scoped>
  #home{
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }
  #navbar{
    background-color: rgb(251, 96, 127);
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
/*scoped 属性可以实习那样式私有化，即仅在当前模块有效，但使用不当会在调试公共模块的时候造成困扰*/
 .home-page-navbar{
    color: white;
  }
 .left-icon,.right-icon{
   padding: 10px 16px 10px;
 }
  .wrapper{
    height: calc(100% - 93px);
    overflow: hidden;/* 滚动必须的属性1 hidden  2 内容要比高度高 */
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0px;
  }
  .content{
    height: 100%;
  }
  .tabhidden{
    position: relative;
    z-index:9;
  }
</style>
 
 