import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class BaseService {
  private http = inject(HttpClient);
  public readonly apiUrl = 'https://wolftasksserver-0unp.onrender.com/'; 

  checkHealth() {
    return this.http.get(`${this.apiUrl}/health`);
  }
}
