import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ActivityService {

  private token = localStorage ? localStorage.getItem('AuthToken') : null;

  constructor(private http: Http) { }

  countActivitiesByPage(page_id): Promise<any> {
    return this.http.get('/api/public/activities/' + page_id + '/count')
               .toPromise()
               .then(response => response.json().count)
               .catch(console.error);
  }

  getActivitiesByPage(page_id, offset?, nbByPage?): Promise<any> {
    let url = '/api/public/activities/' + page_id;
    url += (offset !== 'undefined' && nbByPage !== 'undefined') ? '/' + offset + '/' + nbByPage : '';

    return this.http.get(url)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  getActivity(activity_id): Promise<any> {
    return this.http.get('/api/public/activity/' + activity_id)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  addActivity(activity, page_id): Promise<any> {
    activity.token = this.token;
    return this.http.post('/api/private/activities/' + (page_id ? page_id : activity.page), activity)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  editActivity(activity): Promise<any> {
    activity.token = this.token;
    return this.http.put('/api/private/activity/' + activity._id, activity)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  deleteActivity(activity): Promise<any> {
    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('x-access-token', `${this.token}`);

    let options = new RequestOptions({ headers: headers });

    return this.http.delete('/api/private/activity/' + activity._id, options)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

}
