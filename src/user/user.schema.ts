import { forwardRef } from '@nestjs/common';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Product } from 'src/products/products.schema';
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
  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  })
  products: Product[];
}
export const UserSchema = SchemaFactory.createForClass(User);
