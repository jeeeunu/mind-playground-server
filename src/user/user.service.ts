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

  async duplicateNicknameCheck(nickname: string) {
    const nicknameDuplicateCheck =
      await this.userRepository.findFirstByNickname(nickname);

    if (nicknameDuplicateCheck)
      return getResponse('이미 사용중인 닉네임입니다.', {});

    return getResponse('사용 가능한 닉네임입니다.', {});
  }

  async create(data: Prisma.UserUncheckedCreateInput) {
    await this.userRepository.create(data);

    return createResponse('회원가입 및 로그인 성공', {});
  }

  async updateOwn(accountId: number, data: Prisma.UserUncheckedUpdateInput) {
    await this.userRepository.update(accountId, data);

    return createResponse('회원정보 수정 성공', {});
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

  async deleteOwn(accountId: number) {
    await this.userRepository.delete(accountId);

    return createResponse('회원탈퇴 성공', {});
  }
}
