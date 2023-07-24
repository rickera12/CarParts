import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    // ThrottlerModule.forRootAsync({
    //   useFactory: (configService: ConfigService) => ({
    //     ttl: configService.getOrThrow('UPLOAD_RATE_TTL'),
    //     limit: configService.getOrThrow('UPLOAD_RATE_LIMIT'),
    //   }),
    //   inject: [ConfigService],
    // }),
  ],

  providers: [
    UploadService,
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard,
    // },
  ],
  exports: [UploadService],
})
export class UploadModule {}
