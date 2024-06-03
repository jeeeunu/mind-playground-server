import { Body, Controller, Ip, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthOAuth2LoginDto } from './dto/auth-oauth2-login.dto';
import { IResult } from '../common/interfaces/response.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** 소셜 로그인 */
  @Post('oauth2')
  async oauth2Login(
    @Body() body: AuthOAuth2LoginDto,
    @Ip() ip: string,
  ): Promise<IResult> {
    return await this.authService.oAuthLogin(body, ip);
  }
}
