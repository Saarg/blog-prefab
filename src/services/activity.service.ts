import { Injectable } from '@angular/core';

import { HttpClient } from './httpClient.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ActivityService {

  constructor(
    private httpClient: HttpClient
  ) { }

  countActivitiesByPage(page_id): Promise<any> {
    return this.httpClient.get('/api/public/activities/' + page_id + '/count')
               .toPromise()
               .then(response => response.json().count)
               .catch(console.error);
  }

  getActivitiesByPage(page_id, offset?, nbByPage?): Promise<any> {
    let url = '/api/public/activities/' + page_id;
    url += (offset !== 'undefined' && nbByPage !== 'undefined') ? '/' + offset + '/' + nbByPage : '';

    return this.httpClient.get(url)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  getActivity(activity_id): Promise<any> {
    return this.httpClient.get('/api/public/activity/' + activity_id)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  addActivity(activity, page_id): Promise<any> {
    return this.httpClient.post('/api/private/activities/' + (page_id ? page_id : activity.page), activity)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  editActivity(activity): Promise<any> {
    return this.httpClient.put('/api/private/activity/' + activity._id, activity)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  deleteActivity(activity): Promise<any> {
    return this.httpClient.delete('/api/private/activity/' + activity._id)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  addSubscriber(id, email): Promise<any> {
    return this.httpClient.put('/api/public/activity/' + id, { mail: email })
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

}
