import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Role } from '../interfaces/user.interface';

export class ProfileDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly role: Role;

  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @IsNotEmpty()
  @IsString()
  readonly city: string;

  @IsNotEmpty()
  @IsString()
  readonly street: string;

  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: string;

  @IsOptional()
  readonly token: string;

  @IsNotEmpty()
  @IsString()
  readonly status: string;

  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.role = user.role;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.city = user.city;
    this.street = user.street;
    this.phoneNumber = user.phoneNumber;
    this.token = user.token;
    this.status = user.status;
  }
}
