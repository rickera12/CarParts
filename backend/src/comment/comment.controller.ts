import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { CreateCommentDto } from './dto/CreateCommentDto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('health')
  getHealth() {
    return 'Health controller is working';
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createComment(@Body() data: CreateCommentDto, @Req() req) {
    return await this.commentService.createComment(data, req.user);
  }

  @Get('for-product/:id')
  async getAll(@Param('id') id: string) {
    return await this.commentService.getAll(id);
  }
}
