import { Injectable } from '@nestjs/common';
import { StatusDTO } from './dto/Status.dto';
import { Coupon } from '../../entity/Coupon';
import { CouponRepo } from './coupon.repo';

@Injectable()
export class CouponService {
  constructor(
    private couponRepo: CouponRepo
  ) {
  }
  async getStatusCoupon(uid: number,getStatusDTO: StatusDTO):Promise<Coupon[]> {
    const curDate = new Date()
    return await this.couponRepo.getStatusCoupon(uid, curDate, getStatusDTO);
  }
  // async collectCoupon() {
  //
  // }
}
