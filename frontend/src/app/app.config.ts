import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { routes } from './app.routes';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from './translate.config';
import { CustomTranslateLoader } from './shared/helpers/custom-translation-loader.helper';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: CustomTranslateLoader,
          deps: [HttpClient]
        },
        defaultLanguage: 'pt'
      })
      
    )
  ],
};