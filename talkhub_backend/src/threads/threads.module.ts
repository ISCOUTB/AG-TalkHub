import { Module } from '@nestjs/common';
import { ThreadsController } from './threads.controller';
import { ThreadsService } from './threads.service';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  controllers: [ThreadsController],
  providers: [ThreadsService],
  imports: [CommentsModule],
  exports: [ThreadsService],
})
export class ThreadsModule {}
