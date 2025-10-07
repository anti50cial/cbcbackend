import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateRegistrationDto {
  @MinLength(6)
  @MaxLength(20)
  @IsString()
  @IsNotEmpty()
  uniqueCode: string;

  @MaxLength(50)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsMobilePhone('en-NG')
  @IsNotEmpty()
  phoneNumber: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(['kiddies', 'secondary_school', 'higher_institution', 'others'], {
    message:
      'category must be one of kiddies, secondary_school, higher_institution, others',
  })
  @IsNotEmpty()
  category: string;

  @IsEnum(['M', 'F'])
  @IsNotEmpty()
  gender: 'M' | 'F';

  @MinLength(3)
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  schoolName: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @MinLength(3)
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  location: string;

  @MinLength(3)
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  parentName: string;

  @IsNotEmpty()
  parentContact: string;
}
