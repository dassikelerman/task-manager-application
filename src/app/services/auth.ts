import { Injectable, inject, signal } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs'; 
import {  User } from '../models/models'; 
import { AuthResponse } from '../models/auth.model';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class Auth {
  private http = inject(HttpClient);
  private base = inject(BaseService);
  private apiUrl = `${this.base.apiUrl}/auth`;
  
  // ⚡ signal בודק אם המשתמש מחובר
  isLoggedInSignal = signal<boolean>(!!sessionStorage.getItem('token'));

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(tap(response => {
        this.saveToken(response.token);
        if (response.user) {
          sessionStorage.setItem('user', JSON.stringify(response.user));
        }
        this.isLoggedInSignal.set(true); 
      }));
  }

  register(name: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, { name, email, password })
      .pipe(tap(response => {
        this.saveToken(response.token);
        if (response.user) {
          sessionStorage.setItem('user', JSON.stringify(response.user));
        }
        this.isLoggedInSignal.set(true); 
      }));
  }

  saveToken(token: string): void { 
    sessionStorage.setItem('token', token); 
  }
  
  getToken(): string | null { 
    return sessionStorage.getItem('token'); 
  }

  currentUserValue(): User | null {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) as User : null;
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    this.isLoggedInSignal.set(false); 
  }
}
