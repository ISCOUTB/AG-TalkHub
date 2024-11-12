import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { ThreadsModule } from 'src/threads/threads.module';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [ThreadsModule],
})
export class CategoriesModule {}
