import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateRegistrationDto {
  @IsNotEmpty()
  paymentReference: string;
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
  @IsEnum(['kiddies', 'secondary_school', 'higher_institution', 'others'])
  @IsNotEmpty()
  category: string;
}
