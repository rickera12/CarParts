import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  IsOptional,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly city: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly street: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly phoneNumber: string;
}
