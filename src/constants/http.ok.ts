import { CodeAndMsg } from './http.errror';
import { Coupon } from '../entity/Coupon';

export interface ISuccessCollection extends CodeAndMsg {
  data: Coupon
}

export class SuccessCollectionCoupon implements ISuccessCollection{
  CODE = 40004;
  MESSAGE = "领取优惠券成功"
  constructor(public data) {
  }
}
