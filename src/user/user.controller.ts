import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { IResult } from '../common/interfaces/result.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /** 회원가입 */
  @Post()
  async create(): Promise<IResult> {
    return await this.userService.create();
  }
}
