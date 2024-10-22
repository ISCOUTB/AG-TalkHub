import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'src/repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentDto } from './dto/comment.dto';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import * as schema from '../db/schema';

@Injectable()
export class CommentsService extends Repository<
  CommentDto,
  CreateCommentDto,
  UpdateCommentDto
> {
  /**
   * Create a new CommentsService instance
   * @param drizzle DrizzleBetterSQLite3Database instance
   */
  constructor(
    @Inject('DB_PROD')
    public drizzle: BetterSQLite3Database<typeof schema>,
  ) {
    super(drizzle, schema.comments);
  }

  async getAllTableItems() {
    return this.drizzle.query.comments.findMany({
      with: {
        user: true,
        thread: true,
      },
      columns: {
        id_comment: true,
        content: true,
        publication_date: true,
      },
    });
  }

  async getThreadComments(id: number) {
    return this.drizzle.query.comments.findMany({
      with: {
        user: true,
        thread: true,
      },
      columns: {
        id_comment: true,
        content: true,
        publication_date: true,
      },
      where: (comments, { eq }) => eq(comments.id_thread, id),
    });
  }
}
