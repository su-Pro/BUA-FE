import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepo } from './user.repo';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';



@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'thesecret', // 需要迁移到配置环境中
      signOptions: {
        expiresIn: 36000,
      },
    }),
    TypeOrmModule.forFeature([UserRepo],
    ),
  ],
  controllers: [TokenController],
  providers: [TokenService, JwtStrategy],
  exports: [JwtStrategy, PassportModule], // 不明白这俩是做什么的
})
export class TokenModule {
}
