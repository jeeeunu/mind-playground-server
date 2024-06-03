import { IsNotEmpty, IsString } from 'class-validator';

export class UserDuplicateNicknameCheckDto {
  @IsNotEmpty()
  @IsString()
  nickname: string;
}
