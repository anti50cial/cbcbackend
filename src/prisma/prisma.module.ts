import { Module } from '@nestjs/common';
import { PrismaErrorHandler, PrismaService } from './prisma.service';

@Module({
  providers: [PrismaErrorHandler, PrismaService],
  exports: [PrismaErrorHandler, PrismaService],
})
export class PrismaModule {}
