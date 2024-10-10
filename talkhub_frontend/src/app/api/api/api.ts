export * from './auth.service';
import { AuthService } from './auth.service';
export * from './categories.service';
import { CategoriesService } from './categories.service';
export * from './default.service';
import { DefaultService } from './default.service';
export * from './threads.service';
import { ThreadsService } from './threads.service';
export const APIS = [AuthService, CategoriesService, DefaultService, ThreadsService];
