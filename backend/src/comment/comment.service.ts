import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CommentDocument, CommentModel } from './comment.model';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/CreateCommentDto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(CommentModel.name)
    private commentModel: Model<CommentDocument>,
  ) {}

  async createComment(
    createCommentDto: CreateCommentDto,
    user,
  ): Promise<CommentDocument[]> {
    const comments = [];
    for (let i = 0; i < 1; i++) {
      const comment = new this.commentModel({
        userId: user._id,
        message: createCommentDto.message,
        productId: createCommentDto.productId,
      });
      user.comments.push(comment._id);
      await user.save();
      comments.push(await comment.save());
    }
    return comments;
  }

  async getAll(productId) {
    return await this.commentModel
      .find({
        productId,
      })
      .sort('-createdAt')
      .populate('userId');
  }
}
