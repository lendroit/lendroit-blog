import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './interface/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  signUp(@Body() newUser: UserDTO) {
    return this.userService.createUser(newUser);
  }
}
