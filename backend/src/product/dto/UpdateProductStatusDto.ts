import { IsEnum } from 'class-validator';
import { PRODUCT_STATUS } from 'src/types';

export class UpdateProductStatusDto {
  @IsEnum(PRODUCT_STATUS)
  status: PRODUCT_STATUS;
}
