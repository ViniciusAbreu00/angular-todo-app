import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

interface TaskFormDTO {
  name: '';
  description: '';
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
  task: TaskFormDTO = {
    description: '',
    dueDate: null,
    name: '',
  };

  onSubmit() {
    console.log(this.task);
  }
}
