import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [UtilsModule],
})
export class UsersModule {}
