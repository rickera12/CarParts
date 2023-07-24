import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Role } from './interfaces/user.interface';
import { ProductModel } from 'src/product/product.model';
import { OrderModel } from 'src/order/order.model';
import { CommentModel } from 'src/comment/comment.model';
import { REGISTRATION_LEVEL } from 'src/types';

export type UserDocument = UserModel & Document;

@Schema()
export class UserModel extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Role.Customer })
  role: Role;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  city: string;

  @Prop()
  street: string;

  @Prop()
  phoneNumber: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductModel' }],
  })
  products: ProductModel[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderModel' }],
  })
  orders: OrderModel[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CommentModel' }],
  })
  comments: CommentModel[];

  @Prop({ default: REGISTRATION_LEVEL.CREATED })
  status: REGISTRATION_LEVEL;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
