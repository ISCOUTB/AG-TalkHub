import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'src/repository';
import { VoteDto } from './dto/vote.dto';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import * as schema from '../db/schema';
import { RunResult } from 'better-sqlite3';
import { eq } from 'drizzle-orm';

@Injectable()
export class VotesService extends Repository<
  VoteDto,
  CreateVoteDto,
  UpdateVoteDto
> {
  constructor(
    @Inject('DB_PROD')
    public drizzle: BetterSQLite3Database<typeof schema>,
  ) {
    super(drizzle, schema.votes);
  }

  async getAllCommentVotes(id: number) {
    return this.drizzle.query.votes.findMany({
      where: (votes, { eq }) => eq(votes.id_comment, id),
      with: {
        user: true,
        comments: true,
      },
      columns: {
        id_vote: true,
        type: true,
      },
    });
  }

  async getThreadVoteByUser(id_thread: number, id_user: number) {
    return this.drizzle.query.votes.findFirst({
      where: (votes, { and, eq }) =>
        and(eq(votes.id_thread, id_thread), eq(votes.id_user, id_user)),
      columns: {
        type: true,
        id_vote: true,
        id_thread: true,
      },
    });
  }
  async getCommentVoteByUser(id_comment: number, id_user: number) {
    return this.drizzle.query.votes.findFirst({
      where: (votes, { and, eq }) =>
        and(eq(votes.id_comment, id_comment), eq(votes.id_user, id_user)),
      columns: {
        type: true,
        id_vote: true,
        id_comment: true,
      },
    });
  }
  async getAllThreadVotes(id: number) {
    return this.drizzle.query.votes.findMany({
      where: (votes, { eq }) => eq(votes.id_thread, id),
      with: {
        user: true,
        thread: true,
      },
      columns: {
        id_vote: true,
        type: true,
      },
    });
  }
  /**
   * This method updates a record by id
   * @param id Id of the record
   * @param data Data to update
   */
  async updateById(id: number, data: UpdateVoteDto): Promise<RunResult> {
    console.log(data);
    return this.drizzle
      .update(schema.votes)
      .set(data)
      .where(eq(schema.votes.id_vote, id))
      .run();
  }
}
