import { Injectable } from '@nestjs/common';
import { AuthOAuth2LoginDto } from './dto/auth-oauth2-login.dto';
import { UserRepository } from '../user/user.repository';
import { getResponse } from '../common/functions/response.function';
import { $Enums } from '@prisma/client';
import { UserService } from '../user/user.service';
import { IPayload } from '../common/jwt/interfaces/payload.interface';
import { JwtService } from '../common/jwt/jwt.service';
import { UserTokenRepository } from '../user/user-token/user-token.repository';
import { Config } from '../config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
    private userService: UserService,
    private userTokenRepository: UserTokenRepository,
  ) {}

  async oAuthLogin(data: AuthOAuth2LoginDto, ip: string) {
    //토큰 페이로드
    const payload = await this[`${data.type.toLowerCase()}`](data.oAuthToken);

    //유효성 검사
    const user =
      await this.userRepository.findFirstByOAuthIdWithBlockedHistories(
        payload.oAuthId,
      );

    if (!user) {
      //유저 생성 및 데이터 반환
      const createUser = await this.userRepository.create({
        ...payload,
        nickname: `사용자${new Date().getTime().toString()}`,
        role: $Enums.UserRole.USER,
      });

      //사용자 기기 (App 전용) 정보 업데이트
      await this.userService.updateAppInfo(createUser.id, data);

      //토큰 발급
      const accessToken = this.jwtService.sign<IPayload>(
        { id: createUser.id, isAdmin: false },
        'access',
      );

      //단일 로그인 시 기존 토큰 만료처리
      if (!Config.IS_USER_MULTIPLE_TOKEN)
        await this.userTokenRepository.expirationMany(createUser.id);

      //토큰 저장
      await this.userTokenRepository.create({
        userId: createUser.id,
        accessToken,
        ip,
      });
    }

    return getResponse('회원가입 및 로그인 성공', {});
  }
}
