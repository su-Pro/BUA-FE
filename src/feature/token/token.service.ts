import { Injectable } from '@nestjs/common';
import { UserRepo } from './user.repo';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import * as util from 'util';
import { _httpException } from '../../core/exception/http.excetion';
import { ErrorLogin } from '../../constants/http.errror';
import { User } from '../../entity/User';
import { JwtService } from '@nestjs/jwt';
import { configService } from '../../config/config.service';

interface IwxToken {
  session_key: string;
  openid: string;
}

export interface IJwtPayload {
  openid: string;
}

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(UserRepo)
    private userRepo: UserRepo,
    private jwtService: JwtService,
  ) {
  }

  /**
   * - 对用户身份进行校验 -> 吊起微信api获取用户信息
   *
   * - 认证成功后签发token令牌并返回给客户端
   *
   * @param code 小程序用户登录的code码
   */
  async code2Session(code: string): Promise<string> {
    debugger;
    const url = util.format(
      configService.getWXAuthURL(),
      configService.getWXappId(),
      configService.getWXappSecret(),
      code);
    const data = await axios.get(url);
    if (data.data.errcode) {
      throw new _httpException(new ErrorLogin());
    }
    const wxSession: IwxToken = data.data;
    return this.registerUser(wxSession);
  }

  async registerUser(session: IwxToken): Promise<string> {
    const openid = session.openid;
    if (openid === null) {
      throw new _httpException(new ErrorLogin());
    }
    let user: User = await this.userRepo.findOne({
      where: [
        {
          openid,
        },
      ],
    });
    if (user) {
      const payload: IJwtPayload = {
        openid: user.openid,
      };
      return this.jwtService.signAsync(payload);
    }
    user = new User();
    user.openid = openid;
    await this.userRepo.save(user);
    return this.jwtService.signAsync(user.openid);
  }
}
