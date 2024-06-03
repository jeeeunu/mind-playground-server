import {
  IsBoolean,
  IsDate,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { prismaEnum } from '../../common/functions/prisma-enum.function';
import { $Enums } from '@prisma/client';

export class UserUpdateOwnDto {
  @IsOptional()
  @IsString()
  nickname?: string;

  @IsOptional()
  @IsDate()
  birth?: Date;

  @IsOptional()
  @IsIn(prismaEnum($Enums.UserGender, []))
  gender?: $Enums.UserGender;

  @IsOptional()
  @IsString()
  snsUrl?: string;

  @IsOptional()
  @IsString()
  profileImageUrl?: string;

  @IsOptional()
  @IsInt()
  jobId?: number;

  /** 한국 지역 (시)*/
  @IsOptional()
  @IsInt()
  koreaCityId?: number;

  /** 한국 지역 (군/구) */
  @IsOptional()
  @IsInt()
  koreaResidenceDistrictId?: number;

  @IsOptional()
  @IsBoolean()
  isAlarmSettings?: boolean;

  /** 운영체제 */
  @IsOptional()
  @IsIn(prismaEnum($Enums.OSType, []))
  os?: $Enums.OSType;

  /** 하드웨어 버전 (App 필수) */
  @IsOptional()
  @IsString()
  hardwareVersion?: string;

  /** 소프트웨어 버전 (App 필수) */
  @IsOptional()
  @IsString()
  softwareVersion?: string;

  /** 유저 기기 토큰 (App 필수) */
  @IsOptional()
  @IsString()
  userDeviceToken?: string;
}
