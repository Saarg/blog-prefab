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
      this.pageCount = Math.round(0.5 + this.articleCount / this.nbArticles);
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
    return list;
  }

  goToOffset(i) {
      this.offset = i;
      this.getArticles();
  }
}
