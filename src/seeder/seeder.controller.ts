import { Controller, Get, UseGuards } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederGuard } from './seeder.guard';

@Controller('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @UseGuards(SeederGuard)
  @Get('seed-unique-codes')
  seedUniqueCodes() {
    return this.seederService.seedUniqueCodes();
  }

  @UseGuards(SeederGuard)
  @Get('seed-registrations-ids')
  seedRegistrationIDs() {
    return this.seederService.seedRegistrationIDs();
  }

  @UseGuards(SeederGuard)
  @Get('down')
  down() {
    return this.seederService.down();
  }
}
