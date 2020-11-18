import { EntityRepository, Repository } from 'typeorm';
import { UserCoupon } from '../../entity/UserCoupon';

@EntityRepository(UserCoupon)
export class UserCouponRepo extends Repository<UserCoupon>{

}
