import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ThreadsComponent } from './pages/threads/threads.component';
import { StartComponent } from './pages/start/start.component';
import { NewdiscussionComponent } from './pages/newdiscussion/newdiscussion.component';
import { RulesComponent } from './pages/rules/rules.component';
import { PopularComponent } from './pages/popular/popular.component';
import { FaqComponent } from './pages/faq/faq.component';
import { TermsComponent } from './pages/terms/terms.component';

export const routes: Routes = [
  {
    path: '',
    component: StartComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'terms',
    component: TermsComponent,
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'categories',
    component: CategoriesComponent,
  },
  {
    path: 'threads',
    component: ThreadsComponent,
  },
  {
    path: 'newdiscussion',
    component: NewdiscussionComponent,
  },
  {
    path: 'rules',
    component: RulesComponent,
  },
  {
    path: 'popular',
    component: PopularComponent,
  },
  {
    path: 'faq',
    component: FaqComponent,
  }
];
      

