import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ActivityComponent } from './activity/activity.component';
import { GalleryComponent } from './gallery/gallery.component';

import { ConfigService } from './../services/config.service';
import { ArticleService } from './../services/article.service';
import { MediaService } from './../services/media.service';
import { ActivityService } from './../services/activity.service';
import { PageService } from './../services/page.service';

import { Routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ActivityComponent,
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Routing
  ],
  providers: [
    ConfigService,
    ArticleService,
    MediaService,
    ActivityService,
    PageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
