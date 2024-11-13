import { Inject, Injectable } from '@nestjs/common';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { Repository } from 'src/repository';
import { DeleteModAplicationDto } from './dto/delete-modaplication.dto';
import { ModAplicationDto } from './dto/modaplication.dto';
import { CreateModAplicationDto } from './dto/create-modaplication.dto';
import * as schema from '../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class ModAplicationsService extends Repository<
  ModAplicationDto,
  CreateModAplicationDto,
  DeleteModAplicationDto
> {
  constructor(
    @Inject('DB_PROD')
    public drizzle: BetterSQLite3Database<typeof schema>,
  ) {
    super(drizzle, schema.modaplications);
  }

  async getAllModAplications() {
    return this.drizzle.query.modaplications.findMany({
      with: {
        user: true,
      },
      columns: {
        id_modaplication: true,
        id_user: true,
        date: true,
        reason: true,
      },
    });
  }

  async deleteById(id: number): Promise<void> {
    this.drizzle
      .delete(schema.modaplications)
      .where(eq(schema.modaplications.id_modaplication, id))
      .run();
  }

  async getModAplicationById(id: number): Promise<ModAplicationDto> {
    return this.drizzle.query.modaplications.findFirst({
      where: (modaplications, { eq }) =>
        eq(modaplications.id_modaplication, id),
      with: {
        user: true,
      },
      columns: {
        id_modaplication: true,
        id_user: true,
        date: true,
        reason: true,
      },
    });
  }
}
