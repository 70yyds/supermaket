import { request } from "./request";

export function getDetailData(iid) {
  return request({
    url: "/detail",
    params: {
      iid
    }
  });
}

//获取商品推荐的数据
export function getReCommend(){
  return request({
    url:"/recommend"
  })
}
/*封装一个对象，把杂七杂八的deaileinfo值或者数组取出来，然后导出，在detail中引入传给detailbaseinfo进行渲染 
用constructor方法来初始化对象
*/
export class Goods {
  constructor(itemInfo, columns,  services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.price = itemInfo.price;
    this.oldPrice = itemInfo.lowPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.newPrice = itemInfo.lowNowPrice;
  }
}
/* 封装一个商品信息的集中类 */
export class ShopInfo {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}
