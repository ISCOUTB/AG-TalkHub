import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Routes } from '@angular/router';
import { ThreadsComponent } from './app/pages/threads/threads.component';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));

const routes: Routes = [
    { path: 'threads', component: ThreadsComponent },
    //{ path: 'threads/:id', component: ThreadDetailComponent }, // To be implemented
    
  ];