import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'src/repository';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { ThreadDto } from './dto/thread.dto';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import * as schema from '../db/schema';

@Injectable()
export class ThreadsService extends Repository<
  ThreadDto,
  CreateThreadDto,
  UpdateThreadDto
> {
  /**
   * Create a new UsersService instance
   * @param drizzle DrizzleBetterSQLite3Database instance
   */
  constructor(
    @Inject('DB_PROD')
    public drizzle: BetterSQLite3Database<typeof schema>,
  ) {
    super(drizzle, schema.threads);
  }

  async getAllTableItems() {
    return this.drizzle.query.threads.findMany({
      with: {
        user: true,
        category: true,
      },
      columns: {
        id_thread: true,
        title: true,
        content: true,
        publication_date: true,
      },
    });
  }
}