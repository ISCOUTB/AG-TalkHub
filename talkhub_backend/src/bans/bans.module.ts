import { Module } from '@nestjs/common';
import { BansService } from './bans.service';
import { BansController } from './bans.controller';

@Module({
  providers: [BansService],
  controllers: [BansController]
})
export class BansModule {}
