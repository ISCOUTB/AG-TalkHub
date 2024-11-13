import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'src/repository';
import { BanDto } from './dto/ban.dto';
import { CreateBanDto } from './dto/create-bans.dto';
import * as schema from '../db/schema';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';

@Injectable()
export class BansService extends Repository<BanDto, CreateBanDto> {
  constructor(
    @Inject('DB_PROD')
    public drizzle: BetterSQLite3Database<typeof schema>,
  ) {
    super(drizzle, schema.bans);
  }

  async getBanByUserId(id: number): Promise<BanDto> {
    return this.drizzle.query.bans.findFirst({
      where: (bans, { eq }) => eq(bans.id_user, id),
      columns: {
        id_ban: true,
        reason: true,
        date: true,
        id_user: true,
      },
    });
  }
}
