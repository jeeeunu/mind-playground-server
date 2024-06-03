import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { decode, sign, verify } from 'jsonwebtoken';
import { jwtUsage } from './interfaces/jwt.type';
import { JwtVerifyUnauthorizedException } from '../utils/exceptions/unauthorized.exception';

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
      throw new JwtVerifyUnauthorizedException();
    }
  }

  decode<T>(token: string): T {
    return decode(token) as T;
  }
}
