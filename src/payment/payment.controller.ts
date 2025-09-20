import { Controller, Get, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
// import { CreatePaymentDto } from './dto/create-payment.dto';
// import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // @Post()
  // initializePayment(@Body() createPaymentDto: any) {
  //   return this.paymentService.initializePayment(createPaymentDto);
  // }

  @Get('verify')
  async verify(@Query('reference') ref: string) {
    return this.paymentService.verifyPayment(ref);
  }
}
