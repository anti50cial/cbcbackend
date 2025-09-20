import { Module } from '@nestjs/common';
import { RegistrationModule } from './registration/registration.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { PaymentModule } from './payment/payment.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    RegistrationModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PaymentModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
