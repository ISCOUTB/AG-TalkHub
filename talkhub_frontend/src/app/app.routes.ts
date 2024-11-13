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
import { ThreadDetailComponent } from './pages/thread-detail/thread-detail.component';
import { ProfileDetailComponent } from './pages/profile-detail/profile-detail.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NewcategoryComponent } from './pages/newcategory/newcategory.component';
import { CategoryDetailComponent } from './pages/category-detail/category-detail.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { ModAppsComponent } from './pages/mod-apps/mod-apps.component';
import { ApplyToModComponent } from './pages/apply-to-mod/apply-to-mod.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';

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
    path: 'categories/:id',
    component: CategoryDetailComponent,
  },
  {
    path: 'threads',
    component: ThreadsComponent,
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
  },
  {
    path: 'profile-detail/:id',
    component: ProfileDetailComponent,
  },
  {
    path: 'threads/:id',
    component: ThreadDetailComponent,
  },
  {
    path: 'newdiscussion',
    component: NewdiscussionComponent,
  },
  {
    path: 'newcategory',
    component: NewcategoryComponent,
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
  },
  {
    path: 'reports',
    component: ReportsComponent,
  },
  {
    path: 'mod-apps',
    component: ModAppsComponent,
  },
  {
    path: 'apply',
    component: ApplyToModComponent,
  },
  {
    path: 'notifications/:id',
    component: NotificationsComponent,
  },
];
