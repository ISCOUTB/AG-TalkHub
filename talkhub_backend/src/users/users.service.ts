import { Inject, Injectable } from '@nestjs/common';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { User } from 'src/models/user.model';
import { Repository } from 'src/repository';
import * as schema from '../db/schema';
import { eq } from 'drizzle-orm';
import { HashingService } from 'src/utils/hashing.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RunResult } from 'better-sqlite3';
import { UserDto } from './dto/user.dto';

/**
 * UsersService class
 */
@Injectable()
export class UsersService extends Repository<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  /**
   * Create a new UsersService instance
   * @param drizzle DrizzleBetterSQLite3Database instance
   */
  constructor(
    @Inject('DB_PROD')
    public drizzle: BetterSQLite3Database<typeof schema>,
    private readonly hashingService: HashingService,
  ) {
    super(drizzle, schema.users);
  }

  getByEmail(email: string): Promise<User> {
    return this.drizzle.query.users.findFirst({
      where: eq(schema.users.email, email),
    });
  }

  override async insert(data: CreateUserDto): Promise<RunResult> {
    data.password = await this.hashingService.hashPassword(data.password);

    const id = await super.insert(data);
    return id;
  }

  /**
   * This method returns a record by id
   * @param id Id of the record
   * @returns The record
   */
  async getUserProfileById(id: number): Promise<UserDto> {
    const user = await this.drizzle.query.users
      .findFirst({
        where: eq(schema.users.id, id),
      })
      .execute();

    return new UserDto(
      user.id,
      user.name,
      user.email,
      user.bio,
      user.creation_date,
      user.role,
    );
  }

  override async updateById(
    id: number,
    data: UpdateUserDto,
  ): Promise<RunResult> {
    if (data.password) {
      data.password = await this.hashingService.hashPassword(data.password);
    }

    return super.updateById(id, data);
  }
}
