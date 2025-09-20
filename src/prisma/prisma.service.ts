import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Prisma, PrismaClient } from 'generated/prisma';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}

@Injectable()
export class PrismaErrorHandler {
  handle(error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          throw new ConflictException(
            `Duplicate value for: ${error.meta?.target}`,
          );
        case 'P2003':
          throw new BadRequestException(
            `Invalid relation: ${error.meta?.field_name}`,
          );
        case 'P2025':
          throw new NotFoundException(`Record not found`);
        default:
          throw new BadRequestException(`Database error: ${error.message}`);
      }
    }
    throw error;
  }
}

export { Prisma };
