// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app/app.routes'; // ייבוא הנתיבים שלך

// הוסף את RouterModule ל-appConfig
const updatedAppConfig = {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    RouterModule.forRoot(routes) // הוספת הנתיבים כאן
  ]
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
