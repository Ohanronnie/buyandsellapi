import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.userService.validateUser({ email, password });
    if (user instanceof HttpException) return user;
    return user;
  }
  async login(user: any) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
