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

  public articles = [];
  public page = 0;
  public pageCount = 0;
  public nbArticles = 5;

  public curId = null;

  private offset = 0;
  private articleCount;

  private displayFormPopup = false;

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
    console.log('requesting with offset ' + this.offset);
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
      this.pageCount = Math.round(0.4 + this.articleCount / this.nbArticles);
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

  offsetChange(i) {
    let newOffset = this.offset + i * this.nbArticles;

    if (newOffset < 0) { return; }
    if (newOffset >= this.articleCount) { return; }

    this.offset = newOffset;
    this.getArticles();
  }

  getListNavPage() {
    let list = [];
    for (let i = 0; i < this.articleCount / this.nbArticles; i++) {
      list.push(i * this.nbArticles);
    }
    console.log(list.length);
    return list;
  }

  goToOffset(i) {
      this.offset = i;
      this.getArticles();
  }

  showFormPopup() {
    this.displayFormPopup = true;
  }

  formPopupOnClose() {
    this.displayFormPopup = false;
  }

/* FROM '2016-12-06T16:38:25.003Z'
* TO '2016-12-06 at 16h38'
*/
  getPrettyDate(uglyDate) {
    /*Extracting the first part*/
    let prettyDate = uglyDate.split('T');
    let dayPart = prettyDate[0];

    /*Getting rid of the last part*/
    let hourPart = prettyDate[1].split('.')[0];

    /*Prettier display of the hour*/
    let hourParts = hourPart.split(':');
    hourPart = hourParts[0] + 'h' + hourParts[1];

    return dayPart + ' at ' + hourPart + '\n';
  }

}
