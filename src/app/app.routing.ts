import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ActivityComponent } from './activity/activity.component';
import { GalleryComponent } from './gallery/gallery.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'article/:id', component: HomeComponent },
  { path: 'article', component: HomeComponent },
  { path: 'activity/:id', component: ActivityComponent },
  { path: 'activity', component: ActivityComponent },
  { path: 'gallery/:id', component: GalleryComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
