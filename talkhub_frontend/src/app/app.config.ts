import { ApplicationConfig, Provider, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { Configuration } from './api';

function provideApiModuleConfig(factory: () => Partial<Configuration>): Provider {
  return {
    provide: Configuration,
    useFactory: factory
  };
}

function apiConfigurationFactory() {
  return {
    basePath: 'http://localhost:3000',
    accessToken: localStorage.getItem('access_token') || ''  // Retrieve token from storage
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideApiModuleConfig(apiConfigurationFactory)
  ],
};
