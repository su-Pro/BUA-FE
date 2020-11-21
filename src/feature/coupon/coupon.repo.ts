import { EntityRepository, Repository } from 'typeorm';
import { Coupon } from '../../entity/Coupon';
import { StatusDTO } from './dto/Status.dto';
import { CouponStatus } from '../../enumeration/Coupon.status';

@EntityRepository(Coupon)
export class CouponRepo extends Repository<Coupon> {
  async getStatusCoupon(uid: number, curDate: Date, getStatusDTO: StatusDTO): Promise<Coupon[]> {
    const status = getStatusDTO.status;
    const query = this.createQueryBuilder('coupon')
      .leftJoin('coupon.user', 'user', 'user.id = :uid', { uid })
      .where('coupon_user.status = :status', { status });
    switch (status) {
      case  CouponStatus.AVAILABLE:
        query
          .andWhere('coupon_user.order_id IS null')
          .andWhere('coupon.start_time < :curDate', { curDate })
          .andWhere('coupon.end_time > :curDate', { curDate });
        break;
      case  CouponStatus.USED:
        query
          .andWhere('coupon_user.order_id IS NOT null');
        break;
      case  CouponStatus.EXPIRED :
        query
          .andWhere('coupon.end_time < :curDate', { curDate });
        break;
      default:
        // 抛出错误，没有合理的状态
        break;
    }
    return await query.getMany();
  }

  async findById(couponId: number): Promise<Coupon> {
    const query = this.createQueryBuilder('coupon')
      .where('coupon.id = :couponId', { couponId });
    return await query.getOne();
  }

}
