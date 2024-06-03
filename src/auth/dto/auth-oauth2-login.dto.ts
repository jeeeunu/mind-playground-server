import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { $Enums } from '@prisma/client';
import { prismaEnumFunction } from '../../common/functions/prisma-enum.function';

export class AuthOAuth2LoginDto {
  /** 카카오,애플, 구글: id_token | 네이버, 카카오2: access_token */
  @IsNotEmpty()
  @IsString()
  oAuthToken: string;

  /** 로그인 타입 */
  @IsNotEmpty()
  @IsIn(prismaEnumFunction($Enums.UserAuthType, ['GOOGLE']))
  type: $Enums.UserAuthType;

  /** 하드웨어 버전 (App 필수) */
  @IsOptional()
  @IsString()
  hardwareVersion?: string;

  /** 소프트웨어 버전 (App 필수) */
  @IsOptional()
  @IsString()
  softwareVersion?: string;

  /** 유저 디바이스 토큰 (App 필수) */
  @IsOptional()
  @IsString()
  userDeviceToken?: string;
}
