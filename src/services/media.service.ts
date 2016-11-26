import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MediaService {

  constructor(private http: Http) { }

  getMediasByPage(page_id): Promise<any> {
    return this.http.get("/api/public/medias/" + page_id)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  getMedia(media_id): Promise<any> {
    return this.http.get("/api/public/media/" + media_id)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  // TODO handle auth
  addMedia(media, page_id): Promise<any> {
    return this.http.post("/api/private/medias/" + page_id ? page_id : media.page, media)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  editMedia(media): Promise<any> {
    return this.http.put("/api/private/media/" + media._id, media)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  deleteMedia(media): Promise<any> {
    return this.http.delete("/api/private/media/" + media._id)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

}
