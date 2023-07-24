import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProductDto } from './dto/CreateProductDto';
import { ProductService } from './product.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { RoleGuard } from 'src/user/role.guard';
import { Roles } from 'src/user/roles.decorator';
import { Role } from 'src/user/interfaces/user.interface';
import { UpdateProductStatusDto } from './dto/UpdateProductStatusDto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/health')
  getHealth() {
    return 'ProductController is working';
  }

  @Post('create')
  @UseInterceptors(FilesInterceptor('files'))
  @UseGuards(JwtAuthGuard)
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() data: CreateProductDto,
    @Req() req,
  ) {
    return await this.productService.create(files, data, req.user);
  }

  @Get('all-approved')
  async getAllApproved(@Query('page') page = 1, @Query('limit') limit = 10) {
    return await this.productService.getAllApproved(page, limit);
  }

  @Get('admin-all')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async getAll(@Query() query) {
    // @Query('page') page = 1, @Query('limit') limit = 10,
    const { page, limit, brand, model, yearOfManufacture } = query;
    return await this.productService.getAll(page ?? 1, limit ?? 10, {
      brand,
      model,
      yearOfManufacture,
    });
  }

  @Patch('admin/update-status/:id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async updateStatus(
    @Param('id') id: string,
    @Body() data: UpdateProductStatusDto,
  ) {
    return await this.productService.updateStatus(id, data);
  }

  @Get('by-id/:id')
  @UseGuards(JwtAuthGuard)
  async getById(@Req() req, @Param('id') id: string) {
    return await this.productService.getById(id, req.user);
  }

  @Get('by-user-id/:id')
  @UseGuards(JwtAuthGuard)
  async byUserId(@Param('id') id: string) {
    return await this.productService.byUserId(id);
  }

  @Delete('by-id/:id')
  @UseGuards(JwtAuthGuard)
  async deleteById(@Req() req, @Param('id') id: string) {
    return await this.productService.deleteById(id, req.user);
  }
}
