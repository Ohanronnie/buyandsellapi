import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';

@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const result = await this.userService.createUser(body);
    if (result instanceof HttpException) throw result;
    return result;
  }
}
