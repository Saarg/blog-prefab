import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ActivityComponent } from './activity/activity.component';
import { GalleryComponent } from './gallery/gallery.component';

const appRoutes: Routes = [
  { path: 'activity', component: ActivityComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
