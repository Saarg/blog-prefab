import { Injectable } from '@angular/core';

import { HttpClient } from './httpClient.service';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class ConfigService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getLogo(): Promise<string> {
    /*return this.httpClient.get('/api/public/config/logo')
               .toPromise()
               .then(response => response.arrayBuffer() as ArrayBuffer)
               .catch(console.error);*/
    return Promise.resolve('http://lorempixel.com/200/200/');
  }

  getBanner(): Promise<string> {
    /*return this.httpClient.get('/api/public/config/banner')
               .toPromise()
               .then(response => response.arrayBuffer() as ArrayBuffer)
               .catch(console.error);*/
    return Promise.resolve('http://lorempixel.com/800/200/');
  }

  getValue(key): Promise<any> {
    return this.httpClient.get('/api/public/config/' + key)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  setValue(key, value): Promise<any> {
    return this.httpClient.put('/api/public/config/' + key, { value: value })
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

}
