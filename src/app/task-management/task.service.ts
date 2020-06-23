import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInfo } from './interfaces/user-info.interface';
import { Observable } from 'rxjs';
import { Task } from './interfaces/task.interface';

@Injectable()
export class TaskService {
  constructor (
    private httpClient: HttpClient) {}

  getCurrentUser(): Observable<UserInfo> {
    return this.httpClient.get<UserInfo>('/api/me');
  }

  getTasks(): Observable<Array<Task>> {
    return this.httpClient.get<Array<Task>>('/api/tasks');
  }

  getTask(id: number): Observable<Task> {
    return this.httpClient.get<Task>(`/api/task/${id}`);
  }

  editTask(task: Task): Observable<void> {
    return this.httpClient.put<void>('/api/task', task);
  }

  createTask(task: Task): Observable<void> {
    return this.httpClient.post<void>('/api/task', task);
  }

  deleteTask(id: number): Observable<void> {
    return this.httpClient.delete<void>(`/api/task/${id}`);
  }
}