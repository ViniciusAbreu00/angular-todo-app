import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashAlt, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import {
  NewTaskModalComponent,
  TaskStatus,
} from './new-task-modal/new-task-modal.component';
import { TodoApiService } from '../todo-api.service';

interface Task {
  _id: string;
  name: string;
  description?: string;
  dueDate?: Date | null;
  status: TaskStatus;
}

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [FontAwesomeModule, NgFor, NgIf, NewTaskModalComponent],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.scss',
})
export class TodolistComponent implements OnInit {
  constructor(private api: TodoApiService) {}
  trashIcon = faTrashAlt;
  editIcon = faPenToSquare;
  taskArray: Task[] = [];

  ngOnInit(): void {
    this.getTask();
  }

  getTask() {
    this.api.getTasks().subscribe(
      (tasks) => {
        console.log(tasks);
        this.taskArray = tasks as Task[];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  handleTaskDelete(id: string) {
    this.api.changeTaskStatus(id, TaskStatus.CANCELED).subscribe(() => {
      this.getTask();
    });
  }

  handleDoneTask(ev: any, id: string) {
    this.api
      .changeTaskStatus(
        id,
        ev.target.checked ? TaskStatus.DONE : TaskStatus.IN_PROGRESS
      )
      .subscribe(() => {
        this.getTask();
      });
  }
}
