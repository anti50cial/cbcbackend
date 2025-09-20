import { Injectable } from '@nestjs/common';
import { CreateRegistrationDto } from './dto/create-registration.dto';
// import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { randomBytes } from 'crypto';
import { PrismaErrorHandler, PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly prismaErrorHandler: PrismaErrorHandler,
  ) {}
  async create(createRegistrationDto: CreateRegistrationDto) {
    const randomPart = randomBytes(16).toString('hex').toUpperCase();
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
}
