import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ArticleService {

  constructor(private http: Http) { }

  getArticlesByPage(page_id, page?, nbByPage?): Promise<any> {
    let url = "/api/public/articles/" + page_id;
    url += (page !== 'undefined' && nbByPage !== 'undefined') ? page + "/" + nbByPage : "";

    return this.http.get("/api/public/articles/" + page_id )
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  getArticle(article_id): Promise<any> {
    return this.http.get("/api/public/article/" + article_id)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  // TODO handle auth
  addArticle(article, page_id): Promise<any> {
    console.log("/api/private/articles/" + (page_id ? page_id : article.page));
    return this.http.post("/api/private/articles/" + (page_id ? page_id : article.page), article)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  editArticle(article): Promise<any> {
    return this.http.put("/api/private/article/" + article._id, article)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  deleteArticle(article): Promise<any> {
    return this.http.delete("/api/private/article/" + article._id)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

}
