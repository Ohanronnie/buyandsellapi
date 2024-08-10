import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/user/user.schema';
import { Rating } from './rating.schema';
import { forwardRef } from '@nestjs/common';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Product {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String, required: true })
  description: string;
  @Prop({ type: Number, required: true })
  price: number;
  @Prop({ type: String, required: true })
  currencyCode: string;
  @Prop({ type: String, required: true })
  category: string;
  @Prop({ type: [String], required: true })
  imageUrl: string[];
}
export const ProductSchema = SchemaFactory.createForClass(Product);
