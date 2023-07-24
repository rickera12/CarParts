import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './user/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { NestMailerModule } from './mailer/nest.mailer.module';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './upload/upload.module';
import { ProductModule } from './product/product.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    PassportModule,
    NestMailerModule,
    UploadModule,
    ProductModule,
    OrderModule,
    CommentModule,
    HealthModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
