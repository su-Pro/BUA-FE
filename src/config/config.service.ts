import { TypeOrmModuleOptions } from '@nestjs/typeorm';
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
      type: 'postgres',

      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),

      entities: ['**/*.entity{.ts,.js}'],

      migrationsTableName: 'migration',

      migrations: ['src/migration/*.ts'],

      cli: {
        migrationsDir: 'src/migration',
      },

      ssl: this.isProduction(),
    };
  }

}

const configService = new ConfigService(process.env)
  .ensureValues([
    'WX_AUTH_URL',
    'WX_APPID',
    'WX_APPSECRET',
  ]);

export { configService };
