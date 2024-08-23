import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Category {
	@Prop({ required: true, type: String })
	name: string
}
export const CategorySchema = SchemaFactory.createForClass(Category);
