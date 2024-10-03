export * from './auth.service';
import { AuthService } from './auth.service';
export * from './default.service';
import { DefaultService } from './default.service';
export const APIS = [AuthService, DefaultService];
