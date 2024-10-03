import { Injectable, OnModuleInit } from '@nestjs/common';
import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { ConfigService } from '@nestjs/config';
import * as schema from './db/schema';
import * as Database from 'better-sqlite3';

@Injectable()
export class MigrationService implements OnModuleInit {
  private readonly db: BetterSQLite3Database<typeof schema>;

  constructor(private readonly configService: ConfigService) {
    // Initialize better-sqlite3 directly
    const sqlite = new Database(this.configService.get<string>('DB_FILE'));

    // Pass the initialized instance to drizzle
    this.db = drizzle(sqlite, { schema });
  }

  onModuleInit() {
    this.runMigrations();
  }

  private runMigrations() {
    migrate(this.db, { migrationsFolder: './src/drizzle' });
  }
}
