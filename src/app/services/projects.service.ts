import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/models';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private http = inject(HttpClient);
  private base = inject(BaseService);
  private apiUrl = `${this.base.apiUrl}/projects`;

  getProjectsByTeam(teamId: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}?teamId=${teamId}`);
  }

  getProject(projectId: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${projectId}`);
  }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  createProject(teamId: number, name: string, description: string): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, { teamId, name, description });
  }
}