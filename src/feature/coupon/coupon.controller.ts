import { Controller, Get, Param, UseGuards, ValidationPipe } from '@nestjs/common';
import { StatusDTO } from './dto/Status.dto';
import { CouponService } from './coupon.service';
import { LocalUser } from '../../shared/LocalUser';
import { AuthGuard } from '@nestjs/passport';
import { CollectionCouponDTO } from './dto/CollectionCoupon.dto';

@Controller('coupon')
export class CouponController {
  constructor(
    private couponService: CouponService
  ) {
  }
  @Get('by/status/:status')
  @UseGuards(AuthGuard('jwt'))
  getStatusCoupon (@Param(ValidationPipe)getStatusDTO: StatusDTO) {
    const uid =  LocalUser.getUserID()
   return this.couponService.getStatusCoupon(uid,getStatusDTO);
  }
  @Get('collection/:couponId')
  @UseGuards(AuthGuard('jwt'))
  async collectCoupon (@Param(ValidationPipe) collectionCouponDTO: CollectionCouponDTO):Promise<void> {
    const uid =  LocalUser.getUserID();
   return this.couponService.collectCoupon(uid,collectionCouponDTO)
  }
}
