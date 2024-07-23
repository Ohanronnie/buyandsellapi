import { Body, Controller, HttpException } from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService){};
  async createUser(@Body() body: CreateUserDto){
    const result = await this.userService.createUser(body);
    if(result instanceof HttpException) throw result;
    return result;
  }
}
