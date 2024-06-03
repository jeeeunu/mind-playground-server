import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UserDuplicateNicknameCheckDto } from './dto/user-duplicate-nickname-check.dto';
import { UserUpdateOwnDto } from './dto/user-update-own.dto';
import { IResult } from '../common/interfaces/response.interface';
import { UseRoleGuard } from '../common/decorators/guard.decorator';
import { IPayload } from '../common/jwt/interfaces/payload.interface';
import { Account } from '../common/decorators/account.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /** 회원가입 */
  @Post()
  async create(@Body() body: UserCreateDto): Promise<IResult> {
    return await this.userService.create(body);
  }

  /** 회원정보 수정 */
  @Put('own')
  @UseRoleGuard('USER')
  async updateOwn(
    @Account() account: IPayload,
    @Body() body: UserUpdateOwnDto,
  ): Promise<IResult> {
    return await this.userService.updateOwn(account.id, body);
  }

  /** 회원 탈퇴 */
  @Delete('own')
  @UseRoleGuard('USER')
  async deleteOwn(@Account() account: IPayload): Promise<IResult> {
    return await this.userService.deleteOwn(account.id);
  }

  /** 닉네임 중복검사 */
  @Get('duplicate/nickname/:nickname')
  async duplicateNicknameCheck(
    @Param() param: UserDuplicateNicknameCheckDto,
  ): Promise<IResult> {
    return await this.userService.duplicateNicknameCheck(param.nickname);
  }
}
