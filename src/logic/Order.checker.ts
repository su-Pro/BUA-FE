import { PlaceOrderDTO } from '../feature/order/dto/PlaceOrder.dto';
import { Sku } from '../entity/Sku';
import { CouponChecker } from './Coupon.checker';
import { SkuInfoDTO } from '../feature/order/dto/SkuInfo.dto';
import { MAXIMUM_BUY_SKU } from '../constants/common.constants';

export class SkuOrderBO {
  public realPrice: number;
  public count: number;
  public categoryId: number;

  /**
   *
   * @param sku 服务端查询出的单品，带分类和详细金额信息
   * @param skuInfo 客户端传递过来的sku信息
   */
  constructor(private sku: Sku, private skuInfo: SkuInfoDTO) {
    this.realPrice = sku.getRealPrice();
    this.count = skuInfo.count;
    this.categoryId = sku.category_id;
  }

  public getTotalPrice(): number {
    return (+this.realPrice) * this.count;
  }
}

export class OrderChecker {
  constructor(private placeOrderDTO: PlaceOrderDTO, public serverSkuList: Sku[], private couponChecker: CouponChecker) {
  }

  async isChecked() {
    //  根据前端和后端的sku数量判断即可
    OrderChecker.skuNotOnSale(this.placeOrderDTO.skuInfoList, this.serverSkuList);
    //  计算sku的总价
    let serverTotalPrice: number;
    const skuOrderBOlist: SkuOrderBO[] = [];
    for (let i = 0; i < this.serverSkuList.length; i++) {
      const sku = this.serverSkuList[i];
      const skuInfoDTO: SkuInfoDTO = this.placeOrderDTO.skuInfoList[i];
      /**
       * 检查项：
       * 1. sku列表中是否存在某个商品已卖光
       * 2. 某个sku的购买量是否超出当前库存
       * 3. 某个sku的购买量是否超出最大限制
       */
      OrderChecker.containsSoldOutSku(sku);
      OrderChecker.beyondSkuStock(sku, skuInfoDTO);
      OrderChecker.beyondMaxSkuLimit(skuInfoDTO);
      serverTotalPrice += OrderChecker.singleSkuTotalOrderPrice(sku, skuInfoDTO);
      skuOrderBOlist.push(new SkuOrderBO(sku, skuInfoDTO));
    }
    OrderChecker.toTalPriceIsOk(serverTotalPrice, this.placeOrderDTO.totalPrice);
    if (this.couponChecker) {
      this.couponChecker.effectiveDate();
      this.couponChecker.conditionsUse(skuOrderBOlist, serverTotalPrice);
      this.couponChecker.finalTotalPrice(this.placeOrderDTO.finalTotalPrice, serverTotalPrice);
    }
  }

  /**
   * 累加前端所有商品组数
   */
  getTotalCount() {
    return this.placeOrderDTO.skuInfoList
      .map(item => item.count)
      .reduce((prev, curr) => prev + curr, 0);
  }

  getLeaderImg() {
    return this.serverSkuList[0].img;
  }

  getLeaderTitle() {
    return this.serverSkuList[0].title;
  }

  /**
   * 判断是否有下架商品
   * @param skuInfoList
   * @param serverSkuList 查询时已经排除下架的商品
   * @private
   */
  private static skuNotOnSale(skuInfoList: SkuInfoDTO[], serverSkuList: Sku[]) {
    if (skuInfoList.length !== serverSkuList.length) {
      //  throw
    }
  }

  private static containsSoldOutSku(sku: Sku) {
    if (sku.stock === 0) {
      // throw
    }
  }

  private static beyondSkuStock(sku: Sku, skuInfoDTO: SkuInfoDTO) {
    if (sku.stock < skuInfoDTO.count) {
      //  throw
    }
  }

  private static beyondMaxSkuLimit(skuInfoDTO: SkuInfoDTO) {
    if (skuInfoDTO.count > MAXIMUM_BUY_SKU) {
      // throw
    }
  }

  /**
   * 计算当前单品所购买量的总价钱
   * @param sku
   * @param skuInfoDTO
   * @private
   */
  private static singleSkuTotalOrderPrice(sku: Sku, skuInfoDTO: SkuInfoDTO) {
    if (skuInfoDTO.count <= 0) {
      //  throw
    }
    return skuInfoDTO.count * sku.getRealPrice();
  }

  /**
   * 对比总价
   * @param serverTotalPrice
   * @param totalPrice
   * @private
   */
  private static toTalPriceIsOk(serverTotalPrice: number, totalPrice: number) {

    if (serverTotalPrice === totalPrice) {
      // throw
    }
  }

}
