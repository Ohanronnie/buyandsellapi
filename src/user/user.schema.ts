import {Schema, SchemaFactory, Prop} from "@nestjs/mongoose";


@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: String;
  @Prop({ required: true })
  lastName: String;
  @Prop({ required: true, type: String })
  email: String;
  @Prop({ required: true, type: String })
  password: String;
  @Prop({ required: true, type: String})
  phoneNumber: String;
  @Prop({ type: String })
  profilePicture: String;
}
export const UserSchema = SchemaFactory.createForClass(User);
