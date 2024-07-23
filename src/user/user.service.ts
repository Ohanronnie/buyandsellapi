import {
    BadRequestException,
    HttpStatus,
    Injectable,
    InternalServerErrorException
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.schema";
import { IUser } from "./user.dto";
import { Model } from "mongoose";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>
    ) {}

    async createUser(data: IUser) {
        try {
            const { firstName, lastName, password, phoneNumber, email } = data;
            const userExist = await this.userModel.findOne({ email });

            if (userExist)
                return new BadRequestException(
                    `User with email "${email}" already exist. Try a new one.`
                );

            const user = await this.userModel.create({
                email,
                phoneNumber,
                firstName,
                lastName,
                password,
                profilePicture: "avatar.jpg"
            });
            return {
                statusCode: HttpStatus.OK,
                success: true,
                message: "Account created successfully."
            };
        } catch (error) {
            return new InternalServerErrorException(
                "Sorry... something went wrong, retry in a few minutes."
            );
        }
    }
    
}
