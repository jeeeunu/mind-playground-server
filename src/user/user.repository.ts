import { Prisma } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class UserRepository {
  private userRepository = this.prisma.user;

  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserUncheckedCreateInput) {
    return this.userRepository.create({ data });
  }

  async createMany(data: Prisma.UserCreateManyInput[]) {
    return this.userRepository.createMany({ data });
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    return this.userRepository.update({ where: { id }, data });
  }

  async updateMany(data: Prisma.UserUncheckedUpdateManyInput[]) {
    return await Promise.all(
      data.map((item) =>
        this.userRepository.update({
          where: { id: item.id as number },
          data: item,
        }),
      ),
    );
  }

  async delete(id: number) {
    return this.userRepository.delete({ where: { id } });
  }

  async deleteMany(ids: number[]) {
    return this.userRepository.deleteMany({ where: { id: { in: ids } } });
  }

  async findUniqueOrThrow(id: number) {
    const user = await this.userRepository.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('유저를 찾을 수 없습니다.');
    return user;
  }

  async findMany() {
    return this.userRepository.findMany();
  }

  async findFirstByEmail(email: string) {
    return this.userRepository.findFirst({ where: { email } });
  }

  async findFirstByOAuthIdWithBlockedHistories(oAuthId: string) {
    return this.userRepository.findFirst({
      where: { oAuthId },
      include: { blockedHistories: true },
    });
  }
}
