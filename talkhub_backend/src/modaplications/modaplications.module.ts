import { Module } from '@nestjs/common';
import { ModAplicationsService } from './modaplications.service';
import { ModaplicationsController } from './modaplications.controller';

@Module({
  providers: [ModAplicationsService],
  controllers: [ModaplicationsController],
})
export class ModaplicationsModule {}
