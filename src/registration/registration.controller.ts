import { Controller, Post, Body, Get, Header } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';

@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  create(@Body() createRegistrationDto: CreateRegistrationDto) {
    return this.registrationService.create(createRegistrationDto);
  }

  @Post('verify-unique-code')
  verifyCode(@Body() data: { uniqueCode: string }) {
    return this.registrationService.verifyCode(data);
  }

  @Get('all')
  @Header('Cache-Control', 'no-cache, no-store, must-revalidate')
  @Header('Pragma', 'no-cache')
  @Header('Expires', '0')
  findAll() {
    return this.registrationService.findAll();
    // return this.registrationService.findAll();
  }

  @Get('unique-code')
  findUniqueCodes() {
    return this.registrationService.findUniqueCodes();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.registrationService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateRegistrationDto: UpdateRegistrationDto,
  // ) {
  //   return this.registrationService.update(+id, updateRegistrationDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.registrationService.remove(+id);
  // }
}
