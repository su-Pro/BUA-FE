import { Injectable } from '@nestjs/common';
import { StatusDTO } from './dto/Status.dto';
import { Coupon } from '../../entity/Coupon';
import { CouponRepo } from './coupon.repo';
import { UserCouponRepo } from './userCoupon.repo';
import { CollectionCouponDTO } from './dto/CollectionCoupon.dto';
import { _httpException } from '../../core/exception/http.excetion';
import {
  ErrorCouponActivity,
  ErrorCouponCollection,
  ErrorCouponMiss,
  ErrorCouponRepeat,
} from '../../constants/http.errror';
import { ActivityRepo } from '../activity/Activity.repo';
import { CommonTools } from '../../tools/commonTools';
import { UserCoupon } from '../../entity/UserCoupon';
import { CouponStatus } from '../../enumeration/Coupon.status';
import { SuccessCollectionCoupon } from '../../constants/http.ok';

@Injectable()
export class CouponService {
  constructor(
    private couponRepo: CouponRepo,
    private userCouponRepo: UserCouponRepo,
    private activityRepo: ActivityRepo,
  ) {
  }

  async getStatusCoupon(uid: number, getStatusDTO: StatusDTO): Promise<Coupon[]> {
    const curDate = new Date();
    return await this.couponRepo.getStatusCoupon(uid, curDate, getStatusDTO);
  }

  /**
   * 1. 判断是否为有效的优惠券：
   *    - 查询当前所有的coupon表，如果查询不到，直接抛出错误
   *    - 查询当前优惠券对应的activity表，如果查询不到或者不在日期范围内，直接抛出错误
   *
   * 2. 查询userCoupon表中是否有相同的数据，如果有直接抛出错误
   *
   * 3. 构建数据，并插入到userCoupon中
   * @param uid
   * @param collectionCouponDTO
   */
  async collectCoupon(uid: number, collectionCouponDTO: CollectionCouponDTO): Promise<void> {
    const coupon = await this.couponRepo.findOne({
      where: {
        id: collectionCouponDTO.couponId,
      },
    });
    if (!coupon) {
      throw new _httpException(new ErrorCouponMiss());
    }
    const activity = await this.activityRepo.findOne({
      where: {
        id: coupon.activity_id,
      },
    });
    if (!activity) {
      throw new _httpException(new ErrorCouponActivity());
    }
    const curDate = new Date();
    const validDate = CommonTools.isInTimeLine(
      curDate,
      activity.start_time,
      activity.end_time,
    );
    if (!validDate) {
      throw new _httpException(new ErrorCouponActivity());
    }
    const existCoupon = await this.userCouponRepo.findOne({
      where: {
        "user_id": uid,
        "coupon_id": collectionCouponDTO.couponId
      }
    })
    if(existCoupon){
      throw new _httpException(new ErrorCouponRepeat())
    }
    const userCoupon = new UserCoupon();
    userCoupon.coupon_id = coupon.id;
    userCoupon.status = + CouponStatus.AVAILABLE; // 枚举值为字符串
    userCoupon.user_id = uid;
    userCoupon.create_time = new Date();
    let saveRes = null;
    try {
      saveRes = await this.userCouponRepo.save(userCoupon);
    }
    catch (e) {
      throw new _httpException(new ErrorCouponCollection())
    }
    throw new _httpException(new SuccessCollectionCoupon(saveRes))
  }
}
