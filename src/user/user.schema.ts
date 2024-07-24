import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop({ required: true, type: String })
  email: string;
  @Prop({ required: true, type: String })
  password: string;
  @Prop({ required: true, type: String })
  phoneNumber: string;
  @Prop({ type: String })
  profilePicture: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
