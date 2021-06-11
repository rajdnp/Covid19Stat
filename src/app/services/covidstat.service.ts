import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportByCountryNameResponse } from '../models/ReportByCountryNameResponse';
import { ApiKeyConfig } from "../appconfig/apikeyconfig";
import { ApiKeyService } from './api-key.service';

@Injectable({
  providedIn: 'root',
})
export class CovidstatService {
  baseUrl: string = 'https://covid-19-data.p.rapidapi.com/';
  headers: any = {
    'x-rapidapi-key': 'ba4d9adf28mshf62c29efa993ef9p1d8a48jsn0ecab7b0ffa3',
    'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
  };

  constructor(private httpClient: HttpClient, private apiKeyService: ApiKeyService) {}

  getStatsByCountry(country: string, date: string) : Observable<any> {
    return this.httpClient.get<ReportByCountryNameResponse>(
      this.baseUrl +
        '/report/country/name?name=' +
        country +
        '&' +
        'date=' + date,
      {
        headers: ApiKeyConfig.getCustomHeaders(this.apiKeyService.getApiKey()?.toString()),
      }
    );
  }
}
