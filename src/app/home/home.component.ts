import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ArticleService } from './../../services/article.service';
import { PageService } from './../../services/page.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ArticleService, PageService]
})
export class HomeComponent implements OnInit {

  public admin = false;
  public newArticle = { title: "Enter your title here", text: "Enter your article here", page: 0, position: -1, mimetype: "", media: "" };

  public page = 0;
  public nbArticles = 5;

  public curId = null;

  public articles = [
    {
      "title" : "Lorel et Hardi",
      "text" : "Lorem ipsum dolor sit amet, sed probo adolescens te. Nec ea solet percipitur. Velit quando commodo sed ut, paulo soluta quaerendum vix ut, id aliquip constituam pri. Ex quo solet molestie. Pertinax hendrerit contentiones ei mea. Eu solet dolorem apeirian his.\
      \
      Quo te legere dicunt, qui ad nemore singulis, nam nibh audiam an. Mel ex eius consul. Purto inimicus signiferumque sed et. Ex cum gloriatur assueverit, pri soleat delectus theophrastus id. An doctus scripta mei, melius accusata deseruisse per eu. Sit platonem rationibus eu.",
      "page" : 0,
      "position" : 1
    },
    {
      "title" : "Lorel et Ipsum",
      "text" : "Lorem ipsum dolor sit amet, sed probo adolescens te. Nec ea solet percipitur. Velit quando commodo sed ut, paulo soluta quaerendum vix ut, id aliquip constituam pri. Ex quo solet molestie. Pertinax hendrerit contentiones ei mea. Eu solet dolorem apeirian his.\
      \
      Quo te legere dicunt, qui ad nemore singulis, nam nibh audiam an. Mel ex eius consul. Purto inimicus signiferumque sed et. Ex cum gloriatur assueverit, pri soleat delectus theophrastus id. An doctus scripta mei, melius accusata deseruisse per eu. Sit platonem rationibus eu.",
      "page" : 0,
      "position" : 2,
      "mimetype" : "image/png",
      "media" : "http://lorempixel.com/640/480/"
    },
    {
      "title" : "Ipsum et Hardi",
      "text" : "Lorem ipsum dolor sit amet, sed probo adolescens te. Nec ea solet percipitur. Velit quando commodo sed ut, paulo soluta quaerendum vix ut, id aliquip constituam pri. Ex quo solet molestie. Pertinax hendrerit contentiones ei mea. Eu solet dolorem apeirian his.\
      \
      Quo te legere dicunt, qui ad nemore singulis, nam nibh audiam an. Mel ex eius consul. Purto inimicus signiferumque sed et. Ex cum gloriatur assueverit, pri soleat delectus theophrastus id. An doctus scripta mei, melius accusata deseruisse per eu. Sit platonem rationibus eu.",
      "page" : 0,
      "position" : 3,
      "mimetype" : "image/png",
      "media" : "http://lorempixel.com/1080/720/"
    },
    {
      "title" : "Lorel et Ipsum",
      "text" : "Lorem ipsum dolor sit amet, sed probo adolescens te. Nec ea solet percipitur. Velit quando commodo sed ut, paulo soluta quaerendum vix ut, id aliquip constituam pri. Ex quo solet molestie. Pertinax hendrerit contentiones ei mea. Eu solet dolorem apeirian his.\
      \
      Quo te legere dicunt, qui ad nemore singulis, nam nibh audiam an. Mel ex eius consul. Purto inimicus signiferumque sed et. Ex cum gloriatur assueverit, pri soleat delectus theophrastus id. An doctus scripta mei, melius accusata deseruisse per eu. Sit platonem rationibus eu.",
      "page" : 0,
      "position" : 2
    },
    {
      "title" : "Ipsum et Hardi",
      "text" : "Lorem ipsum dolor sit amet, sed probo adolescens te. Nec ea solet percipitur. Velit quando commodo sed ut, paulo soluta quaerendum vix ut, id aliquip constituam pri. Ex quo solet molestie. Pertinax hendrerit contentiones ei mea. Eu solet dolorem apeirian his.\
      \
      Quo te legere dicunt, qui ad nemore singulis, nam nibh audiam an. Mel ex eius consul. Purto inimicus signiferumque sed et. Ex cum gloriatur assueverit, pri soleat delectus theophrastus id. An doctus scripta mei, melius accusata deseruisse per eu. Sit platonem rationibus eu.Lorem ipsum dolor sit amet, nam legere aliquip oportere ea, mea at solet utinam laoreet. Abhorreant eloquentiam per no, vim ipsum ponderum at. Sea cibo dicat sapientem ut, doctus volutpat ius cu. Facete saperet partiendo et usu. Sea suscipiantur necessitatibus in.\
      \
      Ei per porro harum, expetenda cotidieque has at. Error omnes sea an, in nec erat iracundia, eligendi efficiendi pri et. Nam mutat consequat in, sed diam luptatum ad. Id usu novum sonet argumentum. Forensibus quaerendum eam no, erat prima ea mel, id habeo essent graecis nam.",
      "page" : 0,
      "position" : 3,
      "mimetype" : "image/png",
      "media" : "http://lorempixel.com/640/480/"
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private pageService: PageService
  ) { }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => this.curId = params['id']);
    if(!this.curId) {
      this.getHomePageId();
    } else {
      this.getArticles();
    }
  }

  getArticles() {
    // using dummi pageid for now
    this.articleService.getArticlesByPage(this.curId, this.page, this.nbArticles).then(res => {
      if(!res) { return; }
      this.admin = res.success;
      this.articles = res.articles ? res.articles : this.articles;
    });
  }

  getHomePageId() {
    this.pageService.getHomePage().then(res => {
      if(!res) { return; }
      this.curId = res.page._id;
      this.getArticles();
    });
  }

  submitArticle() {
    // using dummi pageid for now
    this.articleService.addArticle(this.newArticle, this.curId).then(res => {
      if(!res) { return; }
      if(res.success) {
        this.articles.unshift(res.article);
        while (this.articles.length > this.nbArticles) {
          this.articles.pop();
        }
      }
    });
  }

}
