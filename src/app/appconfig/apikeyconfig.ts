import { HttpHeaders } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { ApiKeyService } from './../services/api-key.service';

export class ApiKeyConfig {
  constructor() {}

  static getCustomHeaders(key: any): HttpHeaders {
    console.log('Stored key', key);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    // Your host and key will be added here directly no manual work needed.
    headers = headers.set('x-rapidapi-key', `${key}`);
    headers = headers.set('x-rapidapi-host', 'covid-19-data.p.rapidapi.com');
    return headers;
  }
}
