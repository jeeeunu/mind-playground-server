import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { UserTokenModule } from '../user/user-token/user-token.module';

@Module({
  imports: [UserModule, UserTokenModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
