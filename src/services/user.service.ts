import { Injectable } from '@angular/core';
import { HttpClient } from './httpClient.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  login(user): Promise<any> {
    return this.httpClient.post('/api/private/login/', user)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }
}
