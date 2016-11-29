import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  login(user): Promise<any> {
    return this.http.post("/api/private/login/", user)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

}
