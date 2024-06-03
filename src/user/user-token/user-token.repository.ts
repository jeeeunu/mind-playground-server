import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class UserTokenRepository {
  private userTokenRepository = this.prisma.userToken;

  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserTokenUncheckedCreateInput) {
    return this.userTokenRepository.create({ data });
  }

  async expiration(userId: number, accessToken: string) {
    return this.userTokenRepository.updateMany({
      where: { userId, accessToken },
      data: { isExpiration: true },
    });
  }

  async expirationMany(userId: number) {
    return this.userTokenRepository.updateMany({
      where: { userId, isExpiration: false },
      data: { isExpiration: true },
    });
  }
}
