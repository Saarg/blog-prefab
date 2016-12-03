import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MediaService {

  private token = localStorage ? localStorage.getItem('AuthToken') : null;

  constructor(private http: Http) { }

  getMediasByPage(page_id): Promise<any> {
    return this.http.get('/api/public/medias/' + page_id + '/0/16')
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  getMedia(media_id): Promise<any> {
    return this.http.get('/api/public/media/' + media_id)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  addMedia(media, page_id): Promise<any> {
    media.token = this.token;
    return this.http.post('/api/private/medias/' + (page_id ? page_id : media.page), media)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  editMedia(media): Promise<any> {
    media.token = this.token;
    return this.http.put('/api/private/media/' + media._id, media)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  deleteMedia(media): Promise<any> {
    media.token = this.token;
    return this.http.delete('/api/private/media/' + media._id)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

}
