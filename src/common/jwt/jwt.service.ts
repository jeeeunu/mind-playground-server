import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { decode, sign, verify } from 'jsonwebtoken';
import { jwtUsage } from './interfaces/jwt.type';

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  sign<T>(payload: T, usage: jwtUsage): string {
    return sign(
      payload as object | Buffer | string,
      this.configService.get<string>(
        `${usage.toUpperCase()}_TOKEN_SECRET_KEY`,
      )!,
      {
        expiresIn: this.configService.get<string>(
          `${usage.toUpperCase()}_TOKEN_EXPIRES_IN`,
        )!,
      },
    );
  }

  verify<T>(token: string, usage: jwtUsage): T {
    try {
      return verify(
        token,
        this.configService.get<string>(
          `${usage.toUpperCase()}_TOKEN_SECRET_KEY`,
        )!,
      ) as T;
    } catch (error) {
      throw new UnauthorizedException(
        '로그인이 만료되었거나 잘못된 요청입니다.',
      );
    }
  }

  decode<T>(token: string): T {
    return decode(token) as T;
  }
}
