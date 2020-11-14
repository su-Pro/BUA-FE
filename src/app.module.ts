import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './core/middleware/logger.middleware';
import { Connection } from 'typeorm';
import { TypeOrmCoreModule } from '@nestjs/typeorm/dist/typeorm-core.module';


@Module({
  imports: [
    TypeOrmCoreModule.forRoot(),
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
