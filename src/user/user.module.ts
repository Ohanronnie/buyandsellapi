import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import * as bcrypt from 'bcryptjs';
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: async () => {
          const schema = UserSchema;
          schema.pre('save', function () {
            if (this.isNew || this.isModified('password')) {
              this.password = bcrypt.hashSync(this.password);
            }
            if (
              this.isNew ||
              this.isModified('firstName') ||
              this.isModified('lastName')
            ) {
              this.firstName = this.firstName.trim();
              this.lastName = this.lastName.trim();
              this.fullName = `${this.firstName} ${this.lastName}`;
            }
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, MongooseModule],
})
export class UserModule {}
