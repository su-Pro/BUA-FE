import { Injectable } from '@nestjs/common';
import { PlaceOrderDTO } from './dto/PlaceOrder.dto';
import { CouponRepo } from '../coupon/coupon.repo';
import { SkuRepo } from '../sku/sku.repo';
import { UserCouponRepo } from '../coupon/userCoupon.repo';
import { CouponStatus } from '../../enumeration/Coupon.status';
import { Coupon } from '../../entity/Coupon';
import { UserCoupon } from '../../entity/UserCoupon';
import { CouponChecker } from '../../logic/Coupon.checker';
import { OrderChecker } from '../../logic/Order.checker';
import { OrderRepo } from './Order.repo';
import { Order } from '../../entity/Order';
import { OrderStatus } from '../../enumeration/Order.status';
import { EntityManager } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    private couponRepo: CouponRepo,
    private skuRepo: SkuRepo,
    private userCouponRepo: UserCouponRepo,
    private orderRepo: OrderRepo,
  ) {
  }

  /**
   *TODO:
   * 1. 流水号生成npm包 -> 没那么简单！！！ -> 先给一个时间戳!!!
   * 2. 数据库事务操作注解
   *
   * @param uid
   * @param placeOrderDTO
   * @return OrderChecker -> 用于后面生成订单能够方便的获取更多有用信息
   */
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

  async placeOrder(uid: number, placeOrderDTO: PlaceOrderDTO, orderChecker: OrderChecker, manager: EntityManager): Promise<number> {
    const orderNo = new Date().getTime().toString();
    const order = new Order();
    order.order_no = orderNo;
    order.status = OrderStatus.UNPAID;
    order.user_id = uid;
    order.final_total_price = placeOrderDTO.finalTotalPrice;
    order.total_price = placeOrderDTO.totalPrice + '';
    order.total_count = orderChecker.getTotalCount();
    order.snap_img = orderChecker.getLeaderImg();
    order.snap_title = orderChecker.getLeaderTitle();
    order.snap_address = placeOrderDTO.address;
    order.snap_items = orderChecker.serverSkuList;
    await manager.getCustomRepository(OrderRepo).save(order);
    await OrderService.reduceStock(orderChecker, manager,placeOrderDTO);
    if (placeOrderDTO.couponId) {
      await OrderService.reduceCoupon(placeOrderDTO.couponId, order.id, uid, manager);
    }
    return order.id;
  }

  private static async reduceStock(orderChecker: OrderChecker, manager: EntityManager, placeOrderDTO: PlaceOrderDTO) {
    const orderSkuList = orderChecker.serverSkuList;
    for (let i = 0; i < orderSkuList.length; i++) {
      const toMinusStock = placeOrderDTO.skuInfoList[i].count,
        sid = orderSkuList[i].id;
      const updateRes = await manager.getCustomRepository(SkuRepo).reduceStock(sid,toMinusStock);
      if(!updateRes) {
        // throw
      }
    }
  }

  private static async reduceCoupon(couponId: number, oid: number, uid: number, manager: EntityManager) {
    const updateRes = await manager.getCustomRepository(UserCouponRepo).chargeOffCoupon(couponId, oid, uid)
    if(!updateRes) {
    //  throw
    }
  }
}
