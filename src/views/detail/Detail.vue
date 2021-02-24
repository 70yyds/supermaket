<template>
  <div class="detail">
    <detail-nav-bar class="navbar" @itemclick="itemclick" ref="nav" />
    <scroll
      ref="scroll"
      :pullingup="pullUp"
      @scPosition="scPosition"
      :probetype="3"
    >
      <detail-swiper :detailswiperimg="topimgs" />
      <detail-base-info :detailinfo="gooddetail" />
      <detail-shop-info :shopinfo="shopdetail" />
      <detail-good-info :goodinfo="goodimage" @imageload="imageload" />
      <detail-param-info :paraminfo="paraminfo" ref="param" />
      <detail-rate :detailrate="detailrateinfo" ref="rate" />
      <goodss-list :goodslist="goodspread" ref="goodspread" />
    </scroll>
    <back-top @click.native="backtop" v-show="isShowbackTop" />
    <detail-bottom-bar @addshopcar="addshopcar" />
  </div>
</template>

<script>
import { getDetailData, Goods, ShopInfo, getReCommend } from "network/detail";
import DetailNavBar from "./DetailNavBar";
import DetailSwiper from "./DetailSwiper";
import DetailBaseInfo from "./DetailBaseInfo";
import DetailShopInfo from "./DetailShopInfo";
import DetailGoodInfo from "./DetailGoodInfo";
import DetailParamInfo from "./DetailParamInfo";
import DetailRate from "./DetailRate";
import GoodssList from "components/content/goods/GoodssList";
import Scroll from "components/common/scroll/Scroll";
import DetailBottomBar from "./bottombar/DetailBottomBar";
import { itemListenerMinxin, backtopmixin } from "common/mixin.js";
import { debounce } from "common/utils.js";

export default {
  name: "Detail",
  mixins: [itemListenerMinxin, backtopmixin],
  data() {
    return {
      pullUp: true,
      iid: null,
      /* themeTopY:[0,1000,2000,3000], */
      themeTopY: [],
      getThemeTopY: null,
      topimgs: [],
      gooddetail: {},
      shopdetail: {},
      goodimage: {},
      paraminfo: {},
      detailrateinfo: {},
      goodspread: [],
      currentindex: null,
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodInfo,
    DetailParamInfo,
    DetailRate,
    Scroll,
    GoodssList,
    DetailBottomBar,
  },

  created() {
    /* 
    1  通过gooditem 因为goodlist中有home传递的数据拿到对应商品的id
    2  通过gooditem 中点击的方法获取id  this.$router.push('/Detail/'+this.goodsitem.iid)  调用$router.push到index.js的detail路由路径并传递iid
    3  所以这里才可以通过当前页面的$route.params拿到iid
    4  然后通过network网络请求的方法，并传入iid，在这里回调这个方法才可以拿到后续的各种数据
        */
    (this.iid = this.$route.params.iid),
      //根据id获取商品信息detail
      getDetailData(this.iid).then((res) => {
        /* console.log(res.result); */

        //轮播图图片
        this.topimgs = res.result.itemInfo.topImages;

        //商品实际效果图片
        this.goodimage = res.result.detailInfo;
        /* console.log(this.goodimage); */

        //取出在detail.js中定义好的乱七八糟的商品信息
        const data = res.result;
        this.gooddetail = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        /* console.log(this.gooddetail); */

        //取出shopinfo的琐碎信息
        this.shopdetail = new ShopInfo(data.shopInfo);
        /* console.log(this.shopdetail); */

        //取出paraminfo数据
        this.paraminfo = data.itemParams;

        //取出评论信息
        this.detailrateinfo = data.rate.list[0];
        /* console.log(this.detailrateinfo); */
      });

    getReCommend().then((res) => {
      this.goodspread = res.data.list;
      /* console.log(this.goodspread); */
    });
    //定义一个函数getthemetopy,并对其this.themetopy的赋值进行防抖操作
    this.getThemeTopY = debounce(() => {
      this.themeTopY = [];
      this.themeTopY.push(0);
      //原理是获取各组件的offsetTop，并把它们赋值给themetopy的数组中，赋值用push
      this.themeTopY.push(this.$refs.param.$el.offsetTop);
      this.themeTopY.push(this.$refs.rate.$el.offsetTop);
      this.themeTopY.push(this.$refs.goodspread.$el.offsetTop);
      this.themeTopY.push(Number.MAX_VALUE); //加入一个最大值帮助下面判断滚动对应的index

      /* console.log(this.themeTopY); */
    });
  },
  methods: {
    imageload() {
      this.$refs.scroll.refresh();

      //在图片加载完成之后在进行调用
      //这个函数调用的位置非常重要，他会影响长度的获取，mounted，created，updata等中都不合适，会引发图片和dom渲染的各种问题
      this.getThemeTopY();
    },
    //获取发射回来的index
    itemclick(index) {
      //这里本来可以实现效果，但是不知什么原因会多滚一些长度
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index] + 40, 500);
    },
    scPosition(position) {
      this.isShowbackTop = -position.y > 1000;

      const positionY = -position.y; //获取滚动位置
      let length = this.themeTopY.length; //获取themetop数组的长度当做循环判定的值，算是一种动态获取长度
      for (let i = 0; i < length - 1; i++) {
        //判断大于上一个小于下一个，因此才会多加入一个max.value
        //这里this.currentindex！== i 的作用是判断currentindex当前是否跟i一致，如果不写的话每滑动一次就会给currentindex赋值一次i
        //影响性能

        if (
          this.currentindex !== i &&
          positionY >= this.themeTopY[i] - 40 &&
          positionY < this.themeTopY[i + 1] - 40
        ) {
          this.currentindex = i; //如果条件成立就赋予i
          this.$refs.nav.currentindex = this.currentindex; //并让nav的currentindex更新为当前的判断值
        }
      }
      /* console.log(positionY); */
    },
    //加入购物车功能
    addshopcar() {
      //获取商品信息
      const product = {};
      product.image = this.topimgs[0];
      product.title = this.gooddetail.title;
      product.desc = this.gooddetail.desc;
      product.price = this.gooddetail.newPrice;
      product.iid = this.iid;

      //通过vuex来联系detail和购物车页面数据传递
      //修改stroe中的内容必须在mutaition中修改，因此这里通过commit方法传递参数到mutation中的addcart(带参)
      this.$store.dispatch("addshop", product).then((res) => {
        this.$toast.show(res, 2000);
        console.log(this.$toast);
      });

      //这里也可以通过mapactions映射到methods中，然后在这里回调，一样能达到效果
      //this.addshop(product).then
    },
  },
};
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 9;
  background-color: white;
  height: 100vh; /* 视口高度 */
}
.navbar {
  position: relative; /* 相对定位保持在原来的位置 */
  z-index: 9;
}
.wrapper {
  /* 减掉了顶部和底部的bar */
  height: calc(100% - 44px - 50px);
  overflow: hidden;
}
</style>