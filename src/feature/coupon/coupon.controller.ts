import { Controller, Get, Param, UseGuards, ValidationPipe } from '@nestjs/common';
import { StatusDTO } from './dto/Status.dto';
import { CouponService } from './coupon.service';
import { LocalUser } from '../../shared/LocalUser';
import { AuthGuard } from '@nestjs/passport';

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
}
