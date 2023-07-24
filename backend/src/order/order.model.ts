import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { UserModel } from 'src/user/user.model';
import { ProductModel } from 'src/product/product.model';

export type OrderDocument = OrderModel & Document;

@Schema()
export class OrderModel extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' })
  userId: UserModel;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: ProductModel.name }],
  })
  products: ProductModel[];

  @Prop({ default: Math.floor(Date.now() / 1000) })
  timestamp: number;

  @Prop()
  price: string;
}

export const OrderSchema = SchemaFactory.createForClass(OrderModel);
