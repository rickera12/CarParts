import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OrderDocument, OrderModel } from './order.model';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(OrderModel.name) private orderModel: Model<OrderDocument>,
    private readonly productService: ProductService,
  ) {}

  async createOrder(
    createOrderDto: CreateOrderDto,
    user,
  ): Promise<OrderDocument> {
    const products = await this.productService.getManyByIds(
      createOrderDto.products,
    );

    const price = this._calculateTotalPrice(products);

    return await new this.orderModel({
      products: createOrderDto.products,
      userId: user._id,
      price,
    }).save();
  }

  async getCustomerOrder(user) {
    return await this.orderModel.find({ userId: user._id });
  }

  _calculateTotalPrice(products) {
    return products
      .reduce((sum, product) => {
        const productPrice = Number(product.price);
        if (isNaN(productPrice)) {
          throw new Error(`Invalid price for product with ID ${product._id}`);
        }
        return sum + productPrice;
      }, 0)
      .toFixed(2);
  }
}
