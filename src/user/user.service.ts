import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { ILoginUser, IUser } from './user.dto';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(data: IUser) {
    try {
      const { firstName, role, lastName, password, phoneNumber, email } = data;
      const userExist = await this.userModel.findOne({ email });

      if (userExist)
        return new BadRequestException(
          `User with email "${email}" already exist. Try a new one.`,
        );

      const user = await this.userModel.create({
        email,
        phoneNumber,
        firstName,
        role,
        lastName,
        fullName: firstName.trim() + ' ' + lastName.trim(),
        password,
        profilePicture: 'avatar.jpg',
      });
      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Account created successfully.',
      };
    } catch (error) {
      console.log(error);
      return new InternalServerErrorException(
        'Sorry... something went wrong, retry in a few minutes.',
      );
    }
  }
  async validateUser(data: ILoginUser) {
    const { email, password } = data;

    try {
      const user = await this.userModel.findOne({ email });
      if (!user)
        return new UnauthorizedException(
          ` User with email "${email}" does not exist`,
        );
      const compared = bcrypt.compareSync(password, user.password);
      if (!compared) return new UnauthorizedException('Incorrect Password');
      return { userId: user._id, roles: [user.role] };
    } catch (error) {
      return new UnauthorizedException('Try again after some time');
    }
  }
}
