import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ActivityService {

  constructor(private http: Http) { }

  getActivitiesByPage(page_id): Promise<any> {
    return this.http.get("/api/public/activities/" + page_id)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  getActivity(activity_id): Promise<any> {
    return this.http.get("/api/public/activity/" + activity_id)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  // TODO handle auth
  addActivity(activity, page_id): Promise<any> {
    return this.http.post("/api/private/activities/" + (page_id ? page_id : activity.page), activity)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  editActivity(activity): Promise<any> {
    return this.http.put("/api/private/activity/" + activity._id, activity)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  deleteActivity(activity): Promise<any> {
    return this.http.delete("/api/private/activity/" + activity._id)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

}
