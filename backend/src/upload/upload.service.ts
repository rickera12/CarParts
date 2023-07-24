import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';

@Injectable()
export class UploadService {
  readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
    credentials: {
      accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY'),
      secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
    },
  });

  constructor(private readonly configService: ConfigService) {}

  async upload(file: Express.Multer.File) {
    const body = await sharp(file.buffer)
      .resize({ width: 1920, height: 1080, fit: 'contain' })
      .toBuffer();

    const imageName = uuidv4();

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Key: imageName,
        Body: body,
        ContentType: file.mimetype,
      }),
    );

    return imageName;
  }
}
