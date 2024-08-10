import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Product } from 'puppeteer';
import { User } from 'src/user/user.schema';

@Schema({ timestamps: true })
export class Rating {
  @Prop({ required: true, type: Number })
  rating: number;
  @Prop({ type: String, required: true })
  comment: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product: Product;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}
export const RatingSchema = SchemaFactory.createForClass(Rating);
