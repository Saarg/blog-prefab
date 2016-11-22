import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ConfigService {

  constructor(private http: Http) { }

  getLogo(): Promise<string> {
    /*return this.http.get("/api/public/config/logo")
               .toPromise()
               .then(response => response.arrayBuffer() as ArrayBuffer)
               .catch(console.error);*/
    return Promise.resolve("http://lorempixel.com/200/200/");
  }

  getBanner(): Promise<string> {
    /*return this.http.get("/api/public/config/banner")
               .toPromise()
               .then(response => response.arrayBuffer() as ArrayBuffer)
               .catch(console.error);*/
    return Promise.resolve("http://lorempixel.com/800/200/");
  }

  getValue(key): Promise<any> {
    return this.http.get("/api/public/config/" + key)
               .toPromise()
               .then(response => response.json())
               .catch(console.error);
  }

}
