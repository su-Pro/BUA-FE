import { Coupon } from '../entity/Coupon';
import { CommonTools } from '../tools/commonTools';
import { SkuOrderBO } from './Order.checker';
import { CouponStatus, CouponType } from '../enumeration/Coupon.status';

export class CouponChecker {
  constructor(private coupon: Coupon) {
  }

  /**
   * 检查优惠券有效日期
   */
  effectiveDate(): void {
    const date = new Date();
    const isInTimeLine = CommonTools.isInTimeLine(date, this.coupon.start_time, this.coupon.end_time);
    if (!isInTimeLine) {
      // throw
    }
  }

  /**
   * 检查当前skuList 是否达到使用优惠券的条件
   * @param skuOrderBolist
   * @param serverTotalPrice
   */
  conditionsUse(skuOrderBolist: SkuOrderBO[], serverTotalPrice: number): void {
    let orderCategoryPrice: number;
    if (this.coupon.whole_store) {
      orderCategoryPrice = serverTotalPrice;
    } else {
      const cidList = this.coupon.categoryList
        .map(item => item.id);
      orderCategoryPrice = this.getSumByCategoryList(skuOrderBolist, cidList);
    }
    switch (this.coupon.type) {
      case CouponType.FULL_MINUS:
      case CouponType.FULL_OFF:
        const compare = CommonTools.compareValue(orderCategoryPrice, serverTotalPrice);
        if (!compare) {
          // throw
        }
        break;
      case CouponType.NO_THRESHOLD_MINUS:
        break;
      default:
      //    throw
    }
  }
  finalTotalPrice (finalTotalPrice:number,serverTotalPrice:number):void {
    let serverFinalTotalPrice:number;
    switch (this.coupon.type) {
      case CouponType.NO_THRESHOLD_MINUS:
      case CouponType.FULL_MINUS:
        serverFinalTotalPrice = serverTotalPrice - (+this.coupon.minus);
        break;
      case CouponType.FULL_OFF:
        serverFinalTotalPrice = serverTotalPrice * (+this.coupon.rate);
        break;
      default:
        // throw
    }
    if(serverFinalTotalPrice < 0 || serverFinalTotalPrice !== finalTotalPrice) {
      // throw
    }
  }
  /**
   * 计算当前优惠券能够使用的品类中的总价
   * @param skuOrderBolist
   * @param cidList
   * @private
   */
  private getSumByCategoryList(skuOrderBolist: SkuOrderBO[], cidList: number[]) {
    const sum = cidList
      .map(cid => this.getSumByCategory(skuOrderBolist, cid))
      .reduce((prev, cur) => prev + cur, 0);
    return sum;
  }

  /**
   * 计算当前品类所有商品的总价
   * @param skuOrderBolist
   * @param cid
   * @private
   */
  private getSumByCategory(skuOrderBolist: SkuOrderBO[], cid: number):number {
    const sum = skuOrderBolist
      .filter(item => item.categoryId === cid)
      .map(item => item.getTotalPrice())
      .reduce((prev,cur) => prev + cur,0)
    return sum;
  }
}
