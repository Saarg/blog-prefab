import { Injectable } from '@angular/core';

import { HttpClient } from './httpClient.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PageService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getPages(): Promise<any> {
    return this.httpClient.get('/api/public/pages')
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  getHomePage(): Promise<any> {
    return this.httpClient.get('/api/public/page/home')
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  getPage(page_id): Promise<any> {
    return this.httpClient.get('/api/public/page/' + page_id)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  addPage(page): Promise<any> {
    return this.httpClient.post('/api/private/pages', page)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  editPage(page): Promise<any> {
    return this.httpClient.put('/api/private/page/' + page._id, page)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  deletePage(page): Promise<any> {
    return this.httpClient.delete('/api/private/page/' + page._id)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

}
