import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TodolistComponent } from './todolist/todolist.component';
import { LoginscreenComponent } from './loginscreen/loginscreen.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, TodolistComponent, LoginscreenComponent, RouterLink],
})
export class AppComponent {
  title = 'todo-app';
}
