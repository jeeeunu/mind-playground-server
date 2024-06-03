import { Injectable } from '@nestjs/common';
import {
  createResponse,
  getResponse,
} from '../common/functions/response.function';
import { UserRepository } from './user.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create() {
    return createResponse('회원가입 및 로그인 성공', {});
  }

  async updateAppInfo(id: number, data: Prisma.UserUpdateInput) {
    if (
      data.os &&
      data.hardwareVersion &&
      data.softwareVersion &&
      data.userDeviceToken
    ) {
      await this.userRepository.update(id, {
        os: data.os,
        hardwareVersion: data.hardwareVersion,
        softwareVersion: data.softwareVersion,
        userDeviceToken: data.userDeviceToken,
      });
    }
  }
}
