import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepo } from '../token/user.repo';
import { CouponRepo } from './coupon.repo';
import { UserCouponRepo } from './userCoupon.repo';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepo,CouponRepo,UserCouponRepo])],
  providers: [CouponService],
  controllers: [CouponController]
})
export class CouponModule {}
