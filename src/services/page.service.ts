import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PageService {

  constructor(private http: Http) { }

  getPages(): Promise<any> {
    return this.http.get("/api/public/pages")
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  getPage(page_id): Promise<any> {
    return this.http.get("/api/public/page/" + page_id)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  // TODO handle auth
  addPage(page): Promise<any> {
    return this.http.post("/api/private/pages", page)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  editPage(page): Promise<any> {
    return this.http.put("/api/private/page/" + page._id, page)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  deletePage(page): Promise<any> {
    return this.http.delete("/api/private/page/" + page._id)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

}
