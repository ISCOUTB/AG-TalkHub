import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DrizzleBetterSQLiteModule } from '@knaadh/nestjs-drizzle-better-sqlite3';
import { UtilsModule } from './utils/utils.module';
import * as schema from './db/schema';
import { MigrationService } from './migration.service';
import { config } from 'dotenv';
import { ThreadsModule } from './threads/threads.module';
import { CategoriesModule } from './categories/categories.module';
import { CommentsModule } from './comments/comments.module';
import { VotesModule } from './votes/votes.module';
config();

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    DrizzleBetterSQLiteModule.register({
      tag: 'DB_PROD',
      sqlite3: {
        filename: process.env.DB_FILE,
      },
      config: { schema: { ...schema } },
    }),
    UtilsModule,
    ThreadsModule,
    CategoriesModule,
    CommentsModule,
    VotesModule,
  ],
  controllers: [AppController],
  providers: [AppService, MigrationService],
})
export class AppModule {}
