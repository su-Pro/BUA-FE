import { EntityRepository, Repository } from 'typeorm';
import { UserCoupon } from '../../entity/UserCoupon';
import { Coupon } from '../../entity/Coupon';
import { CouponStatus } from '../../enumeration/Coupon.status';

@EntityRepository(UserCoupon)
export class UserCouponRepo extends Repository<UserCoupon>{
  async findByUiAndStatus(uid: number,coupon:Coupon,status:CouponStatus):Promise<UserCoupon> {
    const query = this.createQueryBuilder('userCoupon')
      .where("userCoupon.user_id = :uid",{uid})
      .andWhere("status = :status",{status: +status});
      return await query.getOne()
  }
}
