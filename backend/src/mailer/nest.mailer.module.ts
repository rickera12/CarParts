import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { NestMailerService } from './nest.mailer.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('EMAIL_HOST'),
          secure: true,
          auth: {
            user: config.get('EMAIL_USER'),
            pass: config.get('EMAIL_PASSWORD'),
          },
        },
        defaults: {
          from: '<sendgrid_from_email_address>',
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
  ],
  providers: [NestMailerService],
  exports: [NestMailerService],
})
export class NestMailerModule {}
