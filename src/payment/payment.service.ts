/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentService {
  private baseUrl = 'https://api.paystack.co';
  private paystackSecretKey: string;

  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {
    this.paystackSecretKey = this.configService.getOrThrow<string>(
      'PAYSTACK_SECRET_KEY',
    );
  }
  async verifyPayment(reference: string): Promise<{ success: boolean }> {
    const response$ = this.http.get(
      `${this.baseUrl}/transaction/verify/${reference}`,
      {
        headers: { Authorization: `Bearer ${this.paystackSecretKey}` },
      },
    );

    const { data } = await lastValueFrom(response$);

    if (data.data.status === 'success') {
      await this.prismaService.applicant.create({
        data: { paymentReference: reference },
      });
      return { success: true };
    }
    return { success: false };
  }
}
