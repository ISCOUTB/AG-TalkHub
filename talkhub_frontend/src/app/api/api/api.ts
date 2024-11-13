export * from './auth.service';
import { AuthService } from './auth.service';
export * from './bans.service';
import { BansService } from './bans.service';
export * from './categories.service';
import { CategoriesService } from './categories.service';
export * from './comments.service';
import { CommentsService } from './comments.service';
export * from './default.service';
import { DefaultService } from './default.service';
export * from './reports.service';
import { ReportsService } from './reports.service';
export * from './threads.service';
import { ThreadsService } from './threads.service';
export * from './votes.service';
import { VotesService } from './votes.service';
export const APIS = [AuthService, BansService, CategoriesService, CommentsService, DefaultService, ReportsService, ThreadsService, VotesService];
