import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCoupon } from '../../entity/UserCoupon';
import { UserCouponRepo } from '../coupon/userCoupon.repo';
import { CouponRepo } from '../coupon/coupon.repo';
import { SkuRepo } from '../sku/sku.repo';
import { OrderRepo } from './Order.repo';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserCouponRepo,CouponRepo,SkuRepo,OrderRepo])
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
