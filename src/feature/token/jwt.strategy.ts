import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { UserRepo } from './user.repo';
import { LocalUser } from '../../shared/LocalUser';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(UserRepo) private userRepo: UserRepo) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'thesecret',
    });
  }

  /**
   * jwt校验成功后调用的处理逻辑，可以在这里进行jwt续签或者其他业务逻辑
   *
   * 只要当前jwt校验成功，就将用户身份保存在localUser中
   *
   * ？： 那不会导致用户身份混乱？ A的被B误用？
   *
   *  不会，是因为每一个需要用到用户身份的接口都需要做权限校验，此时一校验，就会走入这里的逻辑
   * @param payload
   */
  async validate(payload) {
    console.log(payload);
    const user = await this.userRepo.findOne({ openid: payload.openid });
    if (!user) {
      throw new UnauthorizedException();
    } else {
      LocalUser.setUser(user);
    }
    return user;
  }
}
