import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ArticleService } from './../../services/article.service';
import { PageService } from './../../services/page.service';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ArticleService, PageService]
})
export class HomeComponent implements OnInit {

  private subscription: Subscription;

  public token = null;

  public page = 0;
  public pageCount = 0;
  public nbArticles = 5;

  public curId = null;

  private offset = 0;
  private articleCount = 23;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private pageService: PageService
  ) { }

  ngOnInit() {
    this.token = localStorage ? localStorage.getItem('AuthToken') : null;

    this.subscription = this.route.params.subscribe((param: any) => {
      this.curId = param['id'];
    });

    if (!this.curId) {
      this.getHomePageId();
    } else {
      this.getArticles();
    }
  }

  getArticles() {
    console.log("requesting with offset " + this.offset);
    this.articleService.getArticlesByPage(this.curId, this.offset, this.nbArticles).then(res => {
      if (!res) { return; }
      this.articles = res.articles ? res.articles : this.articles;
    });

    this.getArticlesCount();
  }

  getArticlesCount() {
    this.articleService.countArticlesByPage(this.curId).then(res => {
      if (!res) { return; }
      this.articleCount = res ? res : this.articleCount;
      this.pageCount = Math.round(0.5+this.articleCount / this.nbArticles);
    });
  }

  getHomePageId() {
    this.pageService.getHomePage().then(res => {
      if (!res) { return; }
      this.curId = res.page._id;
      this.getArticles();
    });
  }

  goTo(destination) {
    // this will scroll the page up
    window.location.hash = destination;

    // after page scrolls up, scroll down to correct level
    // https://github.com/angular/angular/issues/6595
    setTimeout(() => {
      document.querySelector('#' + destination).parentElement.scrollIntoView();
    });
  }

  newArticle(e) {
    this.articles.unshift(e);
  }

  offsetChange(i)
  {
    var newOffset = this.offset + i * this.nbArticles;

    if(newOffset < 0)return;
    if(newOffset >= this.articleCount)return;

    this.offset = newOffset;
    this.getArticles();
  }

  getListNavPage()
  {
    var list = [];
    for(var i = 0; i < this.articleCount/this.nbArticles; i++)
    {
      list.push(i*this.nbArticles);
    }
    return list;
  }

  goToOffset(i)
  {
      this.offset = i;
      this.getArticles();
  }

  public articles = [
    {
      'title' : 'Lorel et Hardi',
      'text' : 'Lorem ipsum dolor sit amet, sed probo adolescens te. Nec ea \
      solet percipitur. Velit quando commodo sed ut, paulo soluta quaerendum \
      vix ut, id aliquip constituam pri. Ex quo solet molestie. Pertinax \
      hendrerit contentiones ei mea. Eu solet dolorem apeirian his.\
      \
      Quo te legere dicunt, qui ad nemore singulis, nam nibh audiam an. Mel ex \
      eius consul. Purto inimicus signiferumque sed et. Ex cum gloriatur \
      assueverit, pri soleat delectus theophrastus id. An doctus scripta mei, \
      melius accusata deseruisse per eu. Sit platonem rationibus eu.',
      'page' : 0,
      'position' : 1
    },
    {
      'title' : 'Lorel et Ipsum',
      'text' : 'Lorem ipsum dolor sit amet, sed probo adolescens te. Nec ea \
      solet percipitur. Velit quando commodo sed ut, paulo soluta quaerendum \
      vix ut, id aliquip constituam pri. Ex quo solet molestie. Pertinax \
      hendrerit contentiones ei mea. Eu solet dolorem apeirian his.\
      \
      Quo te legere dicunt, qui ad nemore singulis, nam nibh audiam an. Mel ex \
      eius consul. Purto inimicus signiferumque sed et. Ex cum gloriatur \
      assueverit, pri soleat delectus theophrastus id. An doctus scripta mei, \
      melius accusata deseruisse per eu. Sit platonem rationibus eu.',
      'page' : 0,
      'position' : 2,
      'mimetype' : 'image/png',
      'media' : 'http://lorempixel.com/640/480/'
    },
    {
      'title' : 'Ipsum et Hardi',
      'text' : 'Lorem ipsum dolor sit amet, sed probo adolescens te. Nec ea \
      solet percipitur. Velit quando commodo sed ut, paulo soluta quaerendum \
      vix ut, id aliquip constituam pri. Ex quo solet molestie. Pertinax \
      hendrerit contentiones ei mea. Eu solet dolorem apeirian his.\
      \
      Quo te legere dicunt, qui ad nemore singulis, nam nibh audiam an. Mel ex \
      eius consul. Purto inimicus signiferumque sed et. Ex cum gloriatur \
      assueverit, pri soleat delectus theophrastus id. An doctus scripta mei, \
      melius accusata deseruisse per eu. Sit platonem rationibus eu.',
      'page' : 0,
      'position' : 3,
      'mimetype' : 'image/png',
      'media' : 'http://lorempixel.com/1080/720/'
    },
    {
      'title' : 'Lorel et Ipsum',
      'text' : 'Lorem ipsum dolor sit amet, sed probo adolescens te. Nec ea \
      solet percipitur. Velit quando commodo sed ut, paulo soluta quaerendum \
      vix ut, id aliquip constituam pri. Ex quo solet molestie. Pertinax \
      hendrerit contentiones ei mea. Eu solet dolorem apeirian his.\
      \
      Quo te legere dicunt, qui ad nemore singulis, nam nibh audiam an. Mel ex \
      eius consul. Purto inimicus signiferumque sed et. Ex cum gloriatur \
      assueverit, pri soleat delectus theophrastus id. An doctus scripta mei, \
      melius accusata deseruisse per eu. Sit platonem rationibus eu.',
      'page' : 0,
      'position' : 2
    },
    {
      'title' : 'Ipsum et Hardi',
      'text' : 'Lorem ipsum dolor sit amet, sed probo adolescens te. Nec ea \
      solet percipitur. Velit quando commodo sed ut, paulo soluta quaerendum \
      vix ut, id aliquip constituam pri. Ex quo solet molestie. Pertinax \
      hendrerit contentiones ei mea. Eu solet dolorem apeirian his.\
      \
      Quo te legere dicunt, qui ad nemore singulis, nam nibh audiam an. Mel ex \
      eius consul. Purto inimicus signiferumque sed et. Ex cum gloriatur \
      assueverit, pri soleat delectus theophrastus id. An doctus scripta mei, \
      melius accusata deseruisse per eu. Sit platonem rationibus eu.Lorem \
      ipsum dolor sit amet, nam legere aliquip oportere ea, mea at solet \
      utinam laoreet. Abhorreant eloquentiam per no, vim ipsum ponderum at. \
      Sea cibo dicat sapientem ut, doctus volutpat ius cu. Facete saperet \
      partiendo et usu. Sea suscipiantur necessitatibus in.\
      \
      Ei per porro harum, expetenda cotidieque has at. Error omnes sea an, in \
      nec erat iracundia, eligendi efficiendi pri et. Nam mutat consequat in, \
      sed diam luptatum ad. Id usu novum sonet argumentum. Forensibus \
      quaerendum eam no, erat prima ea mel, id habeo essent graecis nam.',
      'page' : 0,
      'position' : 3,
      'mimetype' : 'image/png',
      'media' : 'http://lorempixel.com/640/480/'
    }
  ];
}
