import { Module } from "@nestjs/common";
import { UserTokenRepository } from "./user-token.repository";

@Module({
    providers: [UserTokenRepository],
    exports: [UserTokenRepository],
})
export class UserTokenModule {}
