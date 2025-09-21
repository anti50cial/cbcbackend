import { Injectable } from '@nestjs/common';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { randomBytes } from 'crypto';
import { PrismaErrorHandler, PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly prismaErrorHandler: PrismaErrorHandler,
  ) {}
  async create(createRegistrationDto: CreateRegistrationDto) {
    const randomPart = randomBytes(5).toString('hex').toUpperCase();
    const uniquePIN = `CBC-${new Date().getFullYear()}-${randomPart}`;

    try {
      await this.prismaService.applicant.update({
        where: { paymentReference: createRegistrationDto.paymentReference },
        data: { ...createRegistrationDto, uniquePIN },
      });
      return { success: true, uniquePIN: uniquePIN };
    } catch (error) {
      this.prismaErrorHandler.handle(error);
    }
  }

  async update(updateRegistrationDto: UpdateRegistrationDto) {
    try {
      await this.prismaService.applicant.update({
        where: {
          paymentReference: updateRegistrationDto.paymentReference,
          uniquePIN: updateRegistrationDto.uniquePIN,
        },
        data: {
          schoolName: updateRegistrationDto.schoolName,
          gender: updateRegistrationDto.gender,
          age: +updateRegistrationDto.age,
        },
      });
      return { success: true };
    } catch (error) {
      this.prismaErrorHandler.handle(error);
    }
  }

  async verifyPIN(data: { uniquePIN: string }) {
    let applicant: unknown;
    try {
      applicant = await this.prismaService.applicant.findUnique({
        where: { uniquePIN: data.uniquePIN },
        select: {
          fullName: true,
          email: true,
          paymentReference: true,
          category: true,
          phoneNumber: true,
        },
      });
      // console.log(applicant);
    } catch (error) {
      this.prismaErrorHandler.handle(error);
    }
    if (applicant !== null) {
      return { verified: true, data: applicant };
    } else {
      return { verified: false };
    }
  }
}
