import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import * as schema from './db/schema';
import { SQLiteTable, TableConfig } from 'drizzle-orm/sqlite-core';
import { eq } from 'drizzle-orm';
import { RunResult } from 'better-sqlite3';

/**
 * Repository class for CRUD operations
 */
export abstract class Repository<Row, InsertDto = Row, UpdateDto = Row> {
  /**
   * Create a new Repository instance
   * @param drizzleProd DrizzleBetterSQLite3Database instance
   * @param tableSchema Table name
   */
  constructor(
    private drizzleProd: BetterSQLite3Database<typeof schema>,
    private tableSchema: SQLiteTable<TableConfig>,
  ) {}

  /**
   * This method returns a record by id
   * @param id Id of the record
   * @returns The record
   */
  async getById(id: number): Promise<Row> {
    return this.drizzleProd.query[this.tableSchema._.name].get(id);
  }

  /**
   * This method returns all records
   * @returns All records
   */
  async getAll(): Promise<Row[]> {
    return this.drizzleProd.query[this.tableSchema._.name].all();
  }

  /**
   * This method inserts a new record
   * @param data Data to insert
   * @returns Id of the inserted record
   */
  async insert(data: InsertDto): Promise<RunResult> {
    return this.drizzleProd.insert(this.tableSchema).values(data);
  }

  /**
   * This method updates a record by id
   * @param id Id of the record
   * @param data Data to update
   */
  async updateById(id: number, data: UpdateDto): Promise<RunResult> {
    return this.drizzleProd
      .update(this.tableSchema)
      .set(data)
      .where(eq(this.tableSchema._.columns['id'], id))
      .run();
  }

  /**
   * This method deletes a record by id
   * @param id Id of the record
   */
  async deleteById(id: number): Promise<void> {
    this.drizzleProd
      .delete(this.tableSchema)
      .where(eq(this.tableSchema._.columns['id'], id))
      .run();
  }
}
