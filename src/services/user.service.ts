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
        return null;
      }
      return decoded;
    }
  }

  getUsers(): Promise<any> {
    return this.httpClient.get('/api/private/users')
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  addUser(user): Promise<any> {
    return this.httpClient.post('/api/private/user', user)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  editUser(user): Promise<any> {
    return this.httpClient.put('/api/private/user', user)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  deleteUser(email): Promise<any> {
    return this.httpClient.delete('/api/private/user/' + email)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }
}
