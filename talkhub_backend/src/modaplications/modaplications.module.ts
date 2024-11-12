import { Module } from '@nestjs/common';
import { ModaplicationsService } from './modaplications.service';
import { ModaplicationsController } from './modaplications.controller';

@Module({
  providers: [ModaplicationsService],
  controllers: [ModaplicationsController]
})
export class ModaplicationsModule {}
