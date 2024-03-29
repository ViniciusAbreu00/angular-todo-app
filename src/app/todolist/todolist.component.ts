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
  isEdition: boolean = false;
  taskToEdit: Task | any = {};

  toggleIsEdition(): void {
    console.log('entrou');
    this.isEdition = false;
  }

  ngOnInit(): void {
    this.getTask();
  }
  handleEditTask(task: Task) {
    this.taskToEdit = task;
    this.isEdition = true;
  }

  handleNewTask() {
    this.isEdition = false;
  }

  getTask() {
    this.api.getTasks().subscribe(
      (tasks) => {
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
