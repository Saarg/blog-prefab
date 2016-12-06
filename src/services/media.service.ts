import { Injectable } from '@angular/core';

import { HttpClient } from './httpClient.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MediaService {

  constructor(
    private httpClient: HttpClient
  ) { }

  countMediasByPage(page_id): Promise<any> {
    return this.httpClient.get('/api/public/medias/' + page_id + '/count')
               .toPromise()
               .then(response => response.json().count)
               .catch(console.error);
  }

  getMediasByPage(page_id, offset?, nbByPage?): Promise<any> {
    let url = '/api/public/medias/' + page_id;
    url += (offset !== 'undefined' && nbByPage !== 'undefined') ? '/' + offset + '/' + nbByPage : '';

    return this.httpClient.get(url)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  getMedia(media_id): Promise<any> {
    return this.httpClient.get('/api/public/media/' + media_id)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  addMedia(media, page_id): Promise<any> {
    return this.httpClient.post('/api/private/medias/' + (page_id ? page_id : media.page), media)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  editMedia(media): Promise<any> {
    return this.httpClient.put('/api/private/media/' + media._id, media)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  deleteMedia(media): Promise<any> {
    return this.httpClient.delete('/api/private/media/' + media._id)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

}
