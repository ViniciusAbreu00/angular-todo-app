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

  user = JSON.parse(localStorage.getItem('USER') as any);

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
    const params = new HttpParams()
      .append('status', 'IN_PROGRESS')
      .append('status', 'DONE');
    return this.http.get(`http://localhost:3000/task/${this.user.id}`, {
      params,
    });
  }

  newTask(task: TaskFormDTO) {
    return this.http.post('http://localhost:3000/task', {
      ...task,
      userId: this.user.id,
    });
  }

  changeTaskStatus(taskID: string, status: TaskStatus) {
    return this.http.patch(`http://localhost:3000/task/${taskID}`, {
      userId: this.user.id,
      status: status,
    });
  }

  editTask(taskID: string, task: TaskFormDTO) {
    return this.http.patch(`http://localhost:3000/task/${taskID}`, task);
  }
}
