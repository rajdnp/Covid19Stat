import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiKeyConfig } from '../appconfig/apikeyconfig';
import { CountriesResponse } from '../models/countriesresponse';
import { Observable } from 'rxjs';
import { ApiKeyService } from './api-key.service';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private httpClient: HttpClient, private apiKeyService: ApiKeyService) { }

  getListOfCountries() : Observable<any[]> {
    return this.httpClient.get<CountriesResponse[]>('https://covid-19-data.p.rapidapi.com/help/countries', {
      headers: ApiKeyConfig.getCustomHeaders(this.apiKeyService.getApiKey()?.toString())
    });
  }
}
