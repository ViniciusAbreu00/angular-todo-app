import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { TaskFormDTO } from './todolist/new-task-modal/new-task-modal.component';

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

  getTasks(userID: string) {
    return this.http.get(`http://localhost:3000/task/${userID}`);
  }

  newTask(task: TaskFormDTO) {
    return this.http.post('http://localhost:3000/task', task);
  }
}
