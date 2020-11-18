import { IsIn, IsNotEmpty } from 'class-validator';
import { CouponStatus } from '../../../enumeration/Coupon.status';

export class StatusDTO {
  @IsNotEmpty()
  @IsIn([CouponStatus.AVAILABLE,CouponStatus.USED,CouponStatus.EXPIRED])
  status: string
}
