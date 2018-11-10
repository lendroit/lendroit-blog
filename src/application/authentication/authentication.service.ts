import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticationService {
  constructor(private readonly userService: UserService) {}
  async validateUser(name: string, password: string): Promise<User> {
    return await this.userService.findUser(name, password);
  }
}
