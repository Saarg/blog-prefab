import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PageService {

  private token = localStorage ? localStorage.getItem('AuthToken') : null;

  constructor(private http: Http) { }

  getPages(): Promise<any> {
    return this.http.get('/api/public/pages')
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  getHomePage(): Promise<any> {
    return this.http.get('/api/public/page/home')
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  getPage(page_id): Promise<any> {
    return this.http.get('/api/public/page/' + page_id)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  addPage(page): Promise<any> {
    page.token = this.token;
    return this.http.post('/api/private/pages', page)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  editPage(page): Promise<any> {
    page.token = this.token;
    return this.http.put('/api/private/page/' + page._id, page)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  deletePage(page): Promise<any> {
    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('x-access-token', `${this.token}`);

    let options = new RequestOptions({ headers: headers });

    return this.http.delete('/api/private/page/' + page._id, options)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

}
