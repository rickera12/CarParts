import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('health')
  getHealth() {
    return 'OrderController is working';
  }

  @Get('customer')
  @UseGuards(JwtAuthGuard)
  async getCustomerOrder(@Req() req) {
    return await this.orderService.getCustomerOrder(req.user);
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createOrder(@Req() req, @Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.createOrder(createOrderDto, req.user);
  }
}
