import { IsNotEmpty } from 'class-validator';

export class CollectionCouponDTO {
  @IsNotEmpty()
  couponId: string
}
