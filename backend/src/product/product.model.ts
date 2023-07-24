import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { UserModel } from 'src/user/user.model';
import { PRODUCT_STATUS } from 'src/types';

export type ProductDocument = ProductModel & Document;

@Schema()
export class ProductModel extends Document {
  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true, type: Number })
  yearOfManufacture: number;

  @Prop({ required: true })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' })
  createdBy: UserModel;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ required: true })
  imageURLs: string[];

  @Prop({ type: Number, default: 1 })
  quantity: number;

  @Prop({ default: Date.now })
  timestamp: number;

  @Prop({ required: true, default: PRODUCT_STATUS.CREATED })
  status: PRODUCT_STATUS;
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);
