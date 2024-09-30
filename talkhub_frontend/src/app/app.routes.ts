import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { StartComponent } from './pages/start/start.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '',
    component: StartComponent,
  }
];
