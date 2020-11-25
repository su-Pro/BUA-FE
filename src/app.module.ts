import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './core/middleware/logger.middleware';
import { Connection } from 'typeorm';
import { TypeOrmCoreModule } from '@nestjs/typeorm/dist/typeorm-core.module';
import { ThemeModule } from './feature/theme/theme.module';
import { SkuModule } from './feature/sku/sku.module';
import { CouponModule } from './feature/coupon/coupon.module';
import { TokenModule } from './feature/token/token.module';
import { CategoryModule } from './feature/category/category.module';
import { OrderModule } from './feature/order/order.module';
import { RedisModule } from './shared/redis/redis.module';
import { ActivityModule } from './feature/activity/activity.module';


@Module({
  imports: [
    //TODO: 将数据库配置项移动至env中
    TypeOrmCoreModule.forRoot(),
    ThemeModule,
    SkuModule,
    CouponModule,
    TokenModule,
    CategoryModule,
    OrderModule,
    ActivityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
  configure(consumer: MiddlewareConsumer) {
    const middlewares = [LoggerMiddleware];
    consumer.apply(...middlewares).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
