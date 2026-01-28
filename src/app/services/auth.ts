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
  
  isLoggedInSignal = signal<boolean>(!!localStorage.getItem('token'));

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(tap(response => {
        this.saveToken(response.token);
        if (response.user) {
          localStorage.setItem('user', JSON.stringify(response.user));
        }
        this.isLoggedInSignal.set(true); 
      }));
  }

  register(name: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, { name, email, password })
      .pipe(tap(response => {
        this.saveToken(response.token);
        if (response.user) {
          localStorage.setItem('user', JSON.stringify(response.user));
        }
        this.isLoggedInSignal.set(true); 
      }));
  }

  saveToken(token: string): void { 
    localStorage.setItem('token', token); 
  }
  
  getToken(): string | null { 
    return localStorage.getItem('token'); 
  }

  currentUserValue(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) as User : null;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoggedInSignal.set(false); 
  }
}