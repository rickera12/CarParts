import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { EditUserDto } from './dto/editUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('health')
  getHealth() {
    return 'UserController is working';
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.userService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto);
  }

  @Patch('edit')
  @UseGuards(JwtAuthGuard)
  async editUser(@Body() editUserDto: EditUserDto, @Req() req) {
    return this.userService.editUser(req.user, editUserDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async profile(@Req() req, @Res() res) {
    return await res.status(HttpStatus.OK).json(req.user);
  }

  @Get('check-email/:email')
  async checkEmail(@Param('email') email: string) {
    return await this.userService.checkEmail(email);
  }
}
