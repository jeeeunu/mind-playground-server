import { UnauthorizedException } from '@nestjs/common';

/** **Jwt Verify 검증 오류** */
export class JwtVerifyUnauthorizedException extends UnauthorizedException {
  constructor() {
    super('로그인이 만료되었거나 잘못된 요청입니다.');
  }
}
