import {
  Body,
  Controller,
  HttpException,
  Post,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const result = await this.userService.createUser(body);
    if (result instanceof HttpException) throw result;
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user')
  getUser(@Request() req: any) {
    console.log(req.user);
  }
}
