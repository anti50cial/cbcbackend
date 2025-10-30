import { Injectable } from '@nestjs/common';
import { CreateRegistrationDto } from './dto/create-registration.dto';
// import { UpdateRegistrationDto } from './dto/update-registration.dto';
// import { randomBytes } from 'crypto';
import { PrismaErrorHandler, PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'express';
import { format } from 'fast-csv';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly prismaErrorHandler: PrismaErrorHandler,
  ) {}

  async create(createRegistrationDto: CreateRegistrationDto) {
    const uniqueCodeExists = await this.prismaService.uniqueCode.findUnique({
      where: { code: createRegistrationDto.uniqueCode, isUsed: false },
    });

    if (!uniqueCodeExists) {
      return {
        success: false,
        message: 'The provided unique code does not exist or has been used.',
      };
    }
    const regID = await this.prismaService.registrationID.findFirst({
      where: { isUsed: false, category: createRegistrationDto.category },
    });

    if (!regID) {
      return {
        success: false,
        message: 'No available registration IDs. Please contact support.',
      };
    }
    await this.prismaService.registrationID.update({
      where: { id: regID.id },
      data: { isUsed: true },
    });
    await this.prismaService.uniqueCode.update({
      where: { code: createRegistrationDto.uniqueCode },
      data: { isUsed: true },
    });

    try {
      await this.prismaService.applicant.create({
        data: {
          ...createRegistrationDto,
          regID: regID.regID,
          age: +createRegistrationDto.age,
        },
      });
      return {
        success: true,
        message:
          'Registration successful, your registration ID is: ' +
          regID.regID +
          '\nPlease, keep it safe.',
        regID: regID.regID,
      };
    } catch (error) {
      this.prismaErrorHandler.handle(error);
    }

    // try {
    //   await this.prismaService.applicant.update({
    //     where: { paymentReference: createRegistrationDto.paymentReference },
    //     data: { ...createRegistrationDto, uniquePIN },
    //   });
    //   return { success: true, uniquePIN };
    // } catch (error) {
    //   this.prismaErrorHandler.handle(error);
    // }
  }

  async findAll() {
    return await this.prismaService.applicant.findMany({
      omit: { createdAt: true, updatedAt: true, id: true },
    });
  }

  async findUniqueCodes() {
    return await this.prismaService.uniqueCode.findMany({
      where: { isUsed: false },
      omit: { id: true },
    });
  }

  // async update(updateRegistrationDto: UpdateRegistrationDto) {
  //   try {
  //     await this.prismaService.applicant.update({
  //       where: {
  //         paymentReference: updateRegistrationDto.paymentReference,
  //         uniquePIN: updateRegistrationDto.uniquePIN,
  //       },
  //       data: {
  //         schoolName: updateRegistrationDto.schoolName,
  //         gender: updateRegistrationDto.gender,
  //         age: +updateRegistrationDto.age,
  //       },
  //     });
  //     return { success: true };
  //   } catch (error) {
  //     this.prismaErrorHandler.handle(error);
  //   }
  // }

  async verifyCode(data: { uniqueCode: string }) {
    const codeRecord = await this.prismaService.uniqueCode.findUnique({
      where: { code: data.uniqueCode, isUsed: false },
    });
    console.log(data.uniqueCode);

    if (codeRecord) {
      return { success: true, message: 'Unique code is valid.' };
    } else {
      return {
        success: false,
        message: 'Unique code is invalid or has already been used.',
      };
    }
  }
  async export(res: Response) {
    const applicants = await this.prismaService.applicant.findMany({});
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="delegates.csv"',
    );
    const csvStream = format({ headers: true });
    csvStream.pipe(res);

    applicants.forEach((d) => csvStream.write(d));
    csvStream.end();
  }
}
