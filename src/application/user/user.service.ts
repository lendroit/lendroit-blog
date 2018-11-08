import { UserDTO } from './interface/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}
  createUser(newUser: UserDTO) {
    return this.userRepository.save(newUser);
  }
  findUser(name: string, password: string): Promise<User> {
    return this.userRepository.findOneOrFail({ name, password });
  }
}
