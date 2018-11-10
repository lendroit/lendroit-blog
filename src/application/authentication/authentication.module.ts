import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthenticationService } from './authentication.service';
import { BasicStrategy } from './authentication.strategy';

@Module({
  imports: [UserModule],
  providers: [AuthenticationService, BasicStrategy],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
