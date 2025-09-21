// import { PartialType } from '@nestjs/mapped-types';
// import { CreateRegistrationDto } from './create-registration.dto';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateRegistrationDto {
  @IsString()
  @IsNotEmpty()
  paymentReference: string;
  @IsString()
  @IsNotEmpty()
  uniquePIN: string;
  @IsString()
  @IsNotEmpty()
  fullName: string;
  @IsString()
  @IsNotEmpty()
  schoolName: string;
  @IsEnum(['M', 'F'])
  @IsNotEmpty()
  gender: 'M' | 'F';
  @Type(() => Number)
  @IsNumber()
  age: number;
}
