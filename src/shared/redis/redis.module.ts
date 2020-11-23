import { DynamicModule, Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { configService } from '../../config/config.service';

@Global()
@Module({})
export class RedisModule {
  static forRootAsync():DynamicModule {
    const providers = [
      {
        provide: RedisService,
        useFactory: () => {
          const config = configService.getRedisConfig()
          return new RedisService(config);
        },
      },
    ]
    return {
      module: RedisModule,
      providers,
      exports: providers,
    };
  }
}
