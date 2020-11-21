import { Injectable } from '@nestjs/common';
import { PlaceOrderDTO } from './dto/PlaceOrder.dto';
import { CouponRepo } from '../coupon/coupon.repo';
import { SkuRepo } from '../sku/sku.repo';
import { UserCouponRepo } from '../coupon/userCoupon.repo';
import { parseForESLint } from '@typescript-eslint/parser';
import { CouponStatus } from '../../enumeration/Coupon.status';
import { Coupon } from '../../entity/Coupon';
import { UserCoupon } from '../../entity/UserCoupon';
import { CouponChecker } from '../../logic/Coupon.checker';
import { OrderChecker } from '../../logic/Order.checker';

@Injectable()
export class OrderService {
  constructor(
    private couponRepo: CouponRepo,
    private skuRepo: SkuRepo,
    private userCouponRepo: UserCouponRepo,
  ) {
  }

  async isChecked(uid: number, placeOrderDTO: PlaceOrderDTO): Promise<OrderChecker> {
    // 根据dto中skuId从服务端获取"安全正确"的sku详细信息
    const skuIdList = placeOrderDTO.skuInfoList.map(item => item.id);
    const serverSkuList = await this.skuRepo.findSkuByIdList(skuIdList);
    const couponId = placeOrderDTO.couponId;
    let coupon: Coupon | null = null,
      userCoupon: UserCoupon | null = null,
      couponChecker: CouponChecker | null = null,
      orderChecker: OrderChecker | null = null;
    if (couponId) {
      /**
       * 初步校验优惠券:
       * 1. 存在性
       * 2. 用户是否拥有该优惠券并且状态为未使用
       *
       * 校验通过后创建couponChecker
       */
      coupon = await this.couponRepo.findById(couponId);

      if (!coupon) {
        // throw
      }
      userCoupon = await this.userCouponRepo.findByUiAndStatus(uid, coupon, CouponStatus.AVAILABLE);
      if (!userCoupon) {
        //  throw
      }
      couponChecker = new CouponChecker(coupon);
    }
    orderChecker = new OrderChecker(placeOrderDTO, serverSkuList, couponChecker);
    await orderChecker.isChecked();
    // TODO： orderChecker 这里保存了什么信息？？？
    return orderChecker;
  }
}
