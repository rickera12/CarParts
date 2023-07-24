import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UploadService } from 'src/upload/upload.service';
import { CreateProductDto } from './dto/CreateProductDto';
import { InjectModel } from '@nestjs/mongoose';
import { ProductModel } from './product.model';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ProductDto } from './dto/Product';
import { Role } from 'src/user/interfaces/user.interface';
import { PRODUCT_STATUS } from 'src/types';
import { UpdateProductStatusDto } from './dto/UpdateProductStatusDto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel.name)
    private readonly productModel: Model<ProductModel>,
    private readonly uploadService: UploadService,
    private readonly configService: ConfigService,
  ) {}

  async create(files: Express.Multer.File[], data: CreateProductDto, user) {
    const imageURLs = [];

    for (const file of files) {
      const imageURL = await this.uploadService.upload(file);

      imageURLs.push(imageURL);
    }

    const products = [];

    for (let i = 0; i < 1; i++) {
      const product = await this.productModel.create({
        ...data,
        imageURLs,
        createdBy: user._id,
      });

      products.push(product);
    }

    user.products.push(...products.map((p) => p._id));
    await user.save();
  }

  async getAllApproved(page = 1, limit = 10) {
    return await this._getAll(PRODUCT_STATUS.APPROVED, page, limit);
  }

  async getAll(page = 1, limit = 10, query) {
    console.log(query);

    return await this._getAll(null, page, limit, query);
  }

  async getById(id: string, user: any) {
    const Product = await this._getById(id);

    if (Product.status === PRODUCT_STATUS.CREATED && user.role !== Role.Admin) {
      throw new BadRequestException('No rights to open the file');
    }

    return new ProductDto(Product);
  }

  async byUserId(userId) {
    const products = await this.productModel
      .find({
        createdBy: { $eq: userId },
      })
      .limit(4);

    for (const product of products) {
      for (let i = 0; i < product.imageURLs.length; i++) {
        const getObjectParams = {
          Bucket: this.configService.get('AWS_BUCKET_NAME'),
          Key: product.imageURLs[i],
        };

        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(this.uploadService.s3Client, command, {
          expiresIn: 3600,
        });

        product.imageURLs[i] = url;
      }
    }

    return products;
  }

  async getManyByIds(ids: string[]) {
    const products = this.productModel.find({ _id: { $in: ids } });

    return products;
  }

  async updateStatus(id: string, data: UpdateProductStatusDto) {
    const Product = await this._getById(id);

    Product.status = data.status;

    return await Product.save();
  }

  async deleteById(id: string, user) {
    const Product = await this._getById(id);

    if (Product.createdBy !== user._id) {
      throw new BadRequestException('Cannot delete Product');
    }

    return await this.productModel.findByIdAndDelete(id);
  }

  async _getAll(status?: PRODUCT_STATUS, page = 1, limit = 10, query?: any) {
    const filteredQuery = {};
    console.log(query);
    Object.keys(query).forEach((key) => {
      if (query[key] !== '') {
        if (
          key === 'yearOfManufacture' &&
          query.yearOfManufacture !== undefined &&
          !isNaN(query.yearOfManufacture)
        ) {
          (filteredQuery as any).yearOfManufacture = parseInt(
            query.yearOfManufacture,
            10,
          );
        } else {
          if (key !== 'yearOfManufacture') {
            filteredQuery[key] = { $regex: new RegExp(query[key], 'i') };
          }
        }
      }
    });

    const skip = (page - 1) * limit;

    const totalCount = await this.productModel.countDocuments(
      status ? { status } : {},
    );

    const totalPages = Math.ceil(totalCount / limit);

    const products = await this.productModel
      .find(filteredQuery)
      .skip(skip)
      .limit(limit)
      .populate('createdBy');

    for (const product of products) {
      for (let i = 0; i < product.imageURLs.length; i++) {
        const getObjectParams = {
          Bucket: this.configService.get('AWS_BUCKET_NAME'),
          Key: product.imageURLs[i],
        };

        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(this.uploadService.s3Client, command, {
          expiresIn: 3600,
        });

        product.imageURLs[i] = url;
      }
    }

    const result = {
      products: products.map((product) => new ProductDto(product)),
      totalPages,
      currentPage: page,
      totalCount,
    };

    return result;
  }

  async _getById(id: string) {
    const Product = await this.productModel.findById(id);

    if (!Product) {
      throw new NotFoundException();
    }

    return Product;
  }
}
