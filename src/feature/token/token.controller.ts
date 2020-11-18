import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { TokenService } from './token.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDTO } from './dto/Login.dto';

@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {
  }

  @Post('')
  //ValidationPipe 会自动校验 loginDTO
  async login(@Body(ValidationPipe) loginDTO: LoginDTO) {
    const jwt = await this.tokenService.code2Session(loginDTO.uid);
    return {
      token: jwt,
    };
  }

  @Get('test')
  @UseGuards(AuthGuard())
  authTest() {
    return {
      msg: 'is ok',
    };
  }
}
