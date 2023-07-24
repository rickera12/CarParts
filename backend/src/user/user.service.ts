import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { ProfileDto } from './dto/profile.dto';
import { UserModel } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { EditUserDto } from './dto/editUser.dto';
import { JwtPayload, sign } from 'jsonwebtoken';
import { NestMailerService } from 'src/mailer/nest.mailer.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
    private readonly nestMailerService: NestMailerService,
    private readonly config: ConfigService,
  ) {}

  async register(
    registerDto: RegisterDto,
  ): Promise<ProfileDto & { token: string }> {
    const { email, password, city, firstName, lastName, phoneNumber, street } =
      registerDto;

    const existingUser = await this.userModel.findOne({ email }).exec();

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = new this.userModel({
      email,
      password: hashedPassword,
      city,
      firstName,
      lastName,
      phoneNumber,
      street,
    });

    const savedUser = await createdUser.save();

    const token = sign(
      { email: savedUser.email },
      this.config.get('JWT_SECRET'),
    );

    return {
      ...new ProfileDto(savedUser),
      token,
    };
  }

  async login(loginDto: LoginDto): Promise<ProfileDto & { token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isVerified = await bcrypt.compare(password, user.password);

    if (!isVerified) {
      throw new BadRequestException('Invalid password');
    }

    try {
      await this.nestMailerService.sendMail(
        'mitevandon94@gmail.com',
        'Andon Mitev',
      );
    } catch (err) {
      console.log(err);
    }

    const token = sign({ email: user.email }, this.config.get('JWT_SECRET'));

    return {
      ...new ProfileDto(user),
      token,
    };
  }

  async editUser(
    user: UserModel,
    editUserDto: EditUserDto,
  ): Promise<ProfileDto> {
    Object.assign(user, editUserDto);

    const savedUser = await user.save();

    return new ProfileDto(savedUser);
  }

  async validateUser(payload: JwtPayload) {
    const user = await this.userModel.findOne({ email: payload.email });
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async checkEmail(email: string) {
    const user = await this.userModel.findOne({
      email: { $regex: new RegExp(`^${email}$`, 'i') },
    });

    return {
      exists: Boolean(user),
    };
  }
}
