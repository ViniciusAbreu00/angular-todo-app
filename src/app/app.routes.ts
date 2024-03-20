import { Routes } from '@angular/router';
import { LoginscreenComponent } from './loginscreen/loginscreen.component';
import { TodolistComponent } from './todolist/todolist.component';

export const routes: Routes = [
  { path: '', component: LoginscreenComponent },
  { path: 'app', component: TodolistComponent },
];
