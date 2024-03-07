import { Module } from '@nestjs/common';
import { EntertainersService } from './entertainers.service';
import { EntertainersController } from './entertainers.controller';

@Module({
  providers: [EntertainersService],
  controllers: [EntertainersController]
})
export class EntertainersModule {}
