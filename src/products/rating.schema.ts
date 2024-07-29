import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Rating {
  @Prop({ required: true, type: Number })
  rating: number;
  @Prop({ type: String, required: true })
  comment: string;
}
export const RatingSchema = SchemaFactory.createForClass(Rating);
