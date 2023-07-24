import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NestMailerService {
  constructor(private mailerService: MailerService) {}

  async sendMail(email: string, name: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Greeting from NestJS NodeMailer',
      template: '/email',
      context: {
        name: name,
      },
    });
  }
}
