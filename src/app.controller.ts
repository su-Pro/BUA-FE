import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RedisService } from './shared/redis/redis.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly redisService: RedisService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('redis')
  async test(): Promise<"OK"> {
    return await this.redisService.testSet();
  }
}
