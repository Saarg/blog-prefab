import { Subscription } from 'rxjs';
import { Component, OnInit, OnChanges, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ArticleService } from './../../services/article.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css'],
  providers: [ArticleService]
})
export class ArticleFormComponent implements OnInit, OnChanges {

  @Input() article;
  @Input() pageId: String;
  @Output() newArticleEvent: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() deletedArticleEvent: EventEmitter<Object> = new EventEmitter<Object>();

  private subscription: Subscription;

  public token = null;
  public newArticle = {
    title: 'Enter your title here',
    text: 'Enter your article here',
    page: 0,
    position: -1,
    mimetype: '',
    media: '',
    newArticle: true
  };

  public curId = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private articleService: ArticleService
  ) { }

  ngOnInit() {
    this.token = localStorage ? localStorage.getItem('AuthToken') : null;
    this.article = this.article ? this.article : this.newArticle;

    this.subscription = this.route.params.subscribe((param: any) => {
      this.curId = param['id'];
    });
  }

  ngOnChanges() {
    this.article = this.article ? this.article : this.newArticle;
    this.article.mimetype = this.article.mimetype.slice(0, 5) === 'image' ? 'image' : this.article.mimetype;
  }

  fileChange(input) {
    this.readFile(input.files);
  }

  readFile(file) {
    // Create the file reader
    let reader = new FileReader();

    // If there is a file
    if (file[0]) {
      // Start reading this file
      reader.onload = () => {
        // After the callback fires do:
        this.article.media = reader.result;
      };

      reader.readAsDataURL(file[0]);
    } else {
      // When all files are done This forces a change detection
      this.changeDetectorRef.detectChanges();
    }
  }

  editArticle() {
    this.articleService.editArticle(this.article).then(res => {
      console.log(res);
      if (!res) { return; }
      if (res.success) {
        this.newArticleEvent.next(res.article);
      }
    });
  }

  deleteArticle() {
    this.articleService.deleteArticle(this.article).then(res => {
      console.log(res);
      if (!res) { return; }
      if (res.success) {
        this.deletedArticleEvent.next(this.article);
      }
    });
  }

  submitArticle() {
    // using dummi pageid for now
    this.articleService.addArticle(this.article, this.pageId).then(res => {
      console.log(res);
      if (!res) { return; }
      if (res.success) {
        this.newArticleEvent.next(res.article);
      }
    });
  }

}
