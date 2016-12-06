import { Subscription } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ArticleService } from './../../services/article.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css'],
  providers: [ArticleService]
})
export class ArticleFormComponent implements OnInit {

  @Input() article;
  @Input() pageId: String;
  @Output() newArticleEvent: EventEmitter<Object> = new EventEmitter<Object>();

  private subscription: Subscription;

  public token = null;
  public newArticle = {
    title: 'Enter your title here',
    text: 'Enter your article here',
    page: 0,
    position: -1,
    mimetype: '',
    media: '',
    token: null
  };

  public curId = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService
  ) { }

  ngOnInit() {
    this.token = localStorage ? localStorage.getItem('AuthToken') : null;

    this.subscription = this.route.params.subscribe((param: any) => {
      this.curId = param['id'];
    });
  }

  submitArticle() {
    //this.newArticle.text = this.newArticle.text.replace(/\n/g, "<"+"br/>");
    // using dummi pageid for now
    this.articleService.addArticle(this.newArticle, this.pageId).then(res => {
      console.log(res);
      if (!res) { return; }
      if (res.success) {
        this.newArticleEvent.next(res.article);
      }
    });
  }

}
