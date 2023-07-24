import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsString()
  yearOfManufacture: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  price: string;
}
