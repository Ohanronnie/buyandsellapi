import { forwardRef } from '@nestjs/common';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Product } from 'src/products/products.schema';
@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, type: String })
  firstName: string;
  @Prop({ required: true, type: String })
  lastName: string;
  @Prop({ required: true, type: String })
  fullName: string;
  @Prop({ type: String, required: true })
  role: 'seller' | 'buyer';
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
