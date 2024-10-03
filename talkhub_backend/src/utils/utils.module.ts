import { Module } from '@nestjs/common';
import { HashingService } from './hashing.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [HashingService],
  exports: [HashingService, ConfigModule],
})
export class UtilsModule {}
