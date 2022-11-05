import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiserviceService {
  apiurl: any = 'https://quickchicken.in/api/apis/';

  constructor(public http: HttpClient) {}

  get(subUrl: any) {
    return this.http.get(this.apiurl + subUrl);
  }

  post(subUrl: any, body: any) {
    return this.http.post(this.apiurl + subUrl, body);
  }

  put(subUrl: any) {
    return this.http.get(this.apiurl + subUrl);
  }

  delete(subUrl: any, body: any) {
    return this.http.post(this.apiurl + subUrl, body);
  }
}
