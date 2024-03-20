import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import {
  TaskFormDTO,
  TaskStatus,
} from './todolist/new-task-modal/new-task-modal.component';

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post('http://localhost:3000/auth/login', {
      username,
      password,
    });
  }

  signup(email: string, password: string) {
    return this.http.post('http://localhost:3000/user', { email, password });
  }

  getTasks() {
    const user = JSON.parse(localStorage.getItem('USER') as any);
    const params = new HttpParams()
      .append('status', 'IN_PROGRESS')
      .append('status', 'DONE');
    return this.http.get(`http://localhost:3000/task/${user?.id}`, {
      params,
    });
  }

  newTask(task: TaskFormDTO) {
    const user = JSON.parse(localStorage.getItem('USER') as any);
    return this.http.post('http://localhost:3000/task', {
      ...task,
      userId: user.id,
    });
  }

  changeTaskStatus(taskID: string, status: TaskStatus) {
    const user = JSON.parse(localStorage.getItem('USER') as any);
    return this.http.patch(`http://localhost:3000/task/${taskID}`, {
      userId: user.id,
      status: status,
    });
  }

  editTask(taskID: string, task: TaskFormDTO) {
    return this.http.patch(`http://localhost:3000/task/${taskID}`, task);
  }
}
