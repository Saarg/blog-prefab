import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MediaService {

  private token = localStorage ? localStorage.getItem('AuthToken') : null;

  constructor(private http: Http) { }

  countMediasByPage(page_id): Promise<any> {
    return this.http.get('/api/public/medias/' + page_id + '/count')
               .toPromise()
               .then(response => response.json().count)
               .catch(console.error);
  }

  getMediasByPage(page_id, offset?, nbByPage?): Promise<any> {
    let url = '/api/public/medias/' + page_id;
    url += (offset !== 'undefined' && nbByPage !== 'undefined') ? '/' + offset + '/' + nbByPage : '';

    return this.http.get(url)
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
    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('x-access-token', `${this.token}`);

    let options = new RequestOptions({ headers: headers });

    return this.http.delete('/api/private/media/' + media._id, options)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

}
