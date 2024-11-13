import { Module } from '@nestjs/common';
import { ModAplicationsService } from './modaplications.service';
import { ModAplicationsController } from './modaplications.controller';

@Module({
  providers: [ModAplicationsService],
  controllers: [ModAplicationsController],
})
export class ModaplicationsModule {}
