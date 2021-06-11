import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiKeyService {
  constructor() {}

  getApiKey() {
    let key = localStorage.getItem('x-rapidapi-secret-key');
    if (key != null) return key;
    return null;
  }

  isApiKeyExist() {
    let key = localStorage.getItem('x-rapidapi-secret-key');
    if (key != null) return true;
    return false;
  }

  saveApiKey(key: any) {
    if (key != null) {
      localStorage.setItem('x-rapidapi-secret-key', key);
      return true;
    } else {
      return false;
    }
  }

  removeApiKey() {
    localStorage.removeItem('x-rapidapi-secret-key');
    localStorage.clear();
  }
}
