import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { StartComponent } from './pages/start/start.component';

export const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: '',
    component: StartComponent,
  }
];
