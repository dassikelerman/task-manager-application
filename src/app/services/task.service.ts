import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, Comment as TaskComment } from '../models/models';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private http = inject(HttpClient);
  private base = inject(BaseService); 
  private apiUrl = `${this.base.apiUrl}/tasks`;

  getTasksByProject(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}?projectId=${projectId}`);
  }

  createTask(taskData: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, taskData);
  }

  updateTask(taskId: number, updates: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${taskId}`, updates);
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`);
  }

  getComments(taskId: number): Observable<TaskComment[]> {
    return this.http.get<TaskComment[]>(`${this.base.apiUrl}/comments?taskId=${taskId}`);
  }

  addComment(taskId: number, text: string): Observable<TaskComment> {
    return this.http.post<TaskComment>(`${this.base.apiUrl}/comments`, { taskId, body: text });
  }
}