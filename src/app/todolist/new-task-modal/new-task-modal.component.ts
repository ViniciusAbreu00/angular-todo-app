import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { TodoApiService } from '../../todo-api.service';

export enum TaskStatus {
  CANCELED = 'CANCELED',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface TaskFormDTO {
  name: '';
  description: '';
  status: TaskStatus;
  dueDate: null;
}

@Component({
  selector: 'app-new-task-modal',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './new-task-modal.component.html',
  styleUrl: './new-task-modal.component.scss',
})
export class NewTaskModalComponent {
  constructor(private api: TodoApiService) {}
  @Output() getTasks: EventEmitter<void> = new EventEmitter();
  task: TaskFormDTO = {
    description: '',
    dueDate: null,
    status: TaskStatus.IN_PROGRESS,
    name: '',
  };

  onSubmit() {
    console.log(this.task);
    this.api.newTask(this.task).subscribe(
      (task) => {
        window.alert('Tarefa criada');
        this.getTasks.emit();
      },
      (err) => {
        window.alert('Falha ao criar tarefa');
      }
    );
  }
}
