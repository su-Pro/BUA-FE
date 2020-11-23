import * as IORedis from 'ioredis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisService {
  private client: IORedis.Redis;
  constructor(private readonly config) {
    this.client = new IORedis(config)
    this.client.psubscribe("expired",(error,res) => {
      console.log(error,res)
    })
  }
  async _init() {
    await this.testSet()
  }
  async testSet() {
    const res = await this.client.set("name","spy")
    console.log(res);
    return res;
  }
}
