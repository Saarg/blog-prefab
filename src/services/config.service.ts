import { Injectable } from '@angular/core';

import { HttpClient } from './httpClient.service';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class ConfigService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getLogo(): Promise<any> {
    return this.httpClient.get('/api/public/configs/logo')
               .toPromise()
               .then(response => response.json().config[0])
               .catch(console.error);
    // return Promise.resolve('http://lorempixel.com/200/200/');
  }

  getBanner(): Promise<any> {
    return this.httpClient.get('/api/public/configs/banner')
               .toPromise()
               .then(response => response.json().config[0])
               .catch(console.error);
    // return Promise.resolve('http://lorempixel.com/800/200/');
  }

  getValue(key): Promise<any> {
    return this.httpClient.get('/api/public/configs/' + key)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

  setValue(key, value): Promise<any> {
    return this.httpClient.put('/api/private/configs/' + key, { value: value })
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

}
