import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class BaseService {
  private http = inject(HttpClient);
  public readonly apiUrl = 'http://localhost:3000/api'; 

  checkHealth() {
    return this.http.get(`${this.apiUrl}/health`);
  }
}