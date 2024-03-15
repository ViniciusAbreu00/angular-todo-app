import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { NewTaskModalComponent } from './new-task-modal/new-task-modal.component';

interface Task {
  id: string;
  name: string;
  description?: string;
  dueDate?: Date | null;
  isDone: boolean;
}

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [FontAwesomeModule, NgFor, NgIf, NewTaskModalComponent],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.scss',
})
export class TodolistComponent {
  trashIcon = faTrashAlt;
  taskArray: Task[] = [
    { id: '1', name: 'Task1', isDone: false },
    { id: '2', name: 'Task2', isDone: false },
    { id: '3', name: 'Task3', isDone: false },
  ];

  constructor() {}

  handleNewTask(task: Task) {
    this.taskArray.push({ id: task.id, name: task.name, isDone: task.isDone });
  }
  handleTaskDelete(id: string) {
    this.taskArray = this.taskArray.filter((task) => task.id !== id);
  }

  handleDoneTask(ev: any, id: string) {
    this.taskArray.forEach((task) => {
      if (task.id === id) {
        task.isDone = ev.target.checked;
      }
    });
    console.log(this.taskArray);
  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.handleNewTask({
      id: Math.random().toFixed(2).toString(),
      isDone: false,
      name: form.value['taskName'],
    });
    form.reset();
  }
}
