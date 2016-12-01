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
import { LoginComponent } from './login/login.component';

import { ConfigService } from './../services/config.service';
import { ArticleService } from './../services/article.service';
import { MediaService } from './../services/media.service';
import { ActivityService } from './../services/activity.service';
import { PageService } from './../services/page.service';
import { UserService } from './../services/user.service';

import { Routing } from './app.routing';
import { ArticleFormComponent } from './article-form/article-form.component';
import { MediaFormComponent } from './media-form/media-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ActivityComponent,
    GalleryComponent,
    LoginComponent,
    ArticleFormComponent,
    MediaFormComponent
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
    PageService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
