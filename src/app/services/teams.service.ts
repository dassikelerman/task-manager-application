import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team, AddMemberRequest, User, Project } from '../models/models';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class TeamsService {
  private http = inject(HttpClient);
  private base = inject(BaseService);
  private apiUrl = `${this.base.apiUrl}/teams`;
  
  
  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.apiUrl);
  }

  createTeam(name: string): Observable<Team> {
    return this.http.post<Team>(this.apiUrl, { name });
  }

  addMemberToTeam(teamId: number, memberData: AddMemberRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${teamId}/members`, memberData);
  }
}