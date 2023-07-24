import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { UserModel } from 'src/user/user.model';
import { ProductModel } from 'src/product/product.model';

export type CommentDocument = CommentModel & Document;

@Schema({ timestamps: true })
export class CommentModel extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' })
  userId: UserModel;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ProductModel' })
  productId: ProductModel;

  @Prop()
  message: string;
}

export const CommentSchema = SchemaFactory.createForClass(CommentModel);
