import { Module } from '@nestjs/common';
import { RegistrationModule } from './registration/registration.module';
// import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { SeederModule } from './seeder/seeder.module';

@Module({
  imports: [
    RegistrationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SeederModule,
  ],
})
export class AppModule {}
