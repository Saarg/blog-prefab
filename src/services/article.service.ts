import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ArticleService {

  private token = localStorage ? localStorage.getItem('AuthToken') : null;

  constructor(private http: Http) { }

  getArticlesByPage(page_id, offset?, nbByPage?): Promise<any> {
    let url = '/api/public/articles/' + page_id;
    url += (offset !== 'undefined' && nbByPage !== 'undefined') ? '/' + offset + '/' + nbByPage : '';

    return this.http.get(url)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  getArticle(article_id): Promise<any> {
    return this.http.get('/api/public/article/' + article_id)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  addArticle(article, page_id): Promise<any> {
    article.token = this.token;
    console.log('/api/private/articles/' + (page_id ? page_id : article.page));
    return this.http.post('/api/private/articles/' + (page_id ? page_id : article.page), article)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  editArticle(article): Promise<any> {
    article.token = this.token;
    return this.http.put('/api/private/article/' + article._id, article)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  deleteArticle(article): Promise<any> {
    article.token = this.token;
    return this.http.delete('/api/private/article/' + article._id)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

}
