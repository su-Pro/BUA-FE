import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as IORedis from 'ioredis';
require('dotenv').config();

/**
 * 问题： 如何配置多环境？例如开发、测试、部署环境
 */
class ConfigService {

  constructor(private env: { [k: string]: string | undefined }) { }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  /**
   * 必须保证这些配置项是存在的
   * @param keys
   */
  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public getWXAuthURL() {
    return this.getValue('WX_AUTH_URL',true)
  }
  public getWXappId() {
    return this.getValue('WX_APPID',true)
  }
  public getWXappSecret() {
    return this.getValue('WX_APPSECRET',true)
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
    };
  }
  public getRedisConfig():IORedis.RedisOptions {
    return {
      host: this.getValue("REDIS_HOST"),
      port: parseInt(this.getValue('REDIS_PORT')),
      db:parseInt(this.getValue("REDIS_DB")),
    };
  }
}

const configService = new ConfigService(process.env)
  .ensureValues([
    'WX_AUTH_URL',
    'WX_APPID',
    'WX_APPSECRET',
    "REDIS_HOST",
    "REDIS_PORT",
    "REDIS_DB"
  ]);

export { configService };
