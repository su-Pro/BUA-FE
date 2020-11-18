import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponRepo } from './coupon.repo';
import { UserCouponRepo } from './userCoupon.repo';
import { ActivityRepo } from '../activity/Activity.repo';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityRepo,CouponRepo,UserCouponRepo])],
  providers: [CouponService],
  controllers: [CouponController]
})
export class CouponModule {}
