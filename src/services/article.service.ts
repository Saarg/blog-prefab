import { Injectable } from '@angular/core';

import { HttpClient } from './httpClient.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ArticleService {

  constructor(
    private httpClient: HttpClient
  ) { }


  countArticlesByPage(page_id): Promise<any> {
    return this.httpClient.get('/api/public/articles/' + page_id + '/count')
               .toPromise()
               .then(response => response.json().count)
               .catch(console.error);
  }

  getArticlesByPage(page_id, offset?, nbByPage?): Promise<any> {
    let url = '/api/public/articles/' + page_id;
    url += (offset !== 'undefined' && nbByPage !== 'undefined') ? '/' + offset + '/' + nbByPage : '';

    return this.httpClient.get(url)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  getArticle(article_id): Promise<any> {
    return this.httpClient.get('/api/public/article/' + article_id)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  addArticle(article, page_id): Promise<any> {
    return this.httpClient.post('/api/private/articles/' + (page_id ? page_id : article.page), article)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  editArticle(article): Promise<any> {
    return this.httpClient.put('/api/private/article/' + article._id, article)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  deleteArticle(article): Promise<any> {
    return this.httpClient.delete('/api/private/article/' + article._id)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

}
