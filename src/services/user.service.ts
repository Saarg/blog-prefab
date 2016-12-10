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

  verifyToken(token) {
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      const decoded = JSON.parse(window.atob(base64));

      if (decoded['exp'] < new Date().getTime() / 1000) {
        token = null;
        localStorage.clear();
        return 0;
      }
      return 1;
    }
  }
}
