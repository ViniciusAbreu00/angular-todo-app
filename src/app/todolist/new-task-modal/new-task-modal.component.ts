import { NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
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
}

@Component({
  selector: 'app-new-task-modal',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './new-task-modal.component.html',
  styleUrl: './new-task-modal.component.scss',
})
export class NewTaskModalComponent implements OnChanges {
  constructor(private api: TodoApiService) {}
  @Output() getTasks: EventEmitter<void> = new EventEmitter();
  @Output() toggleIsEdition: EventEmitter<void> = new EventEmitter();
  @Input() taskToEdit: any = {};
  @Input() isEdition: any = false;

  task: TaskFormDTO = {
    description: '',
    status: TaskStatus.IN_PROGRESS,
    name: '',
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskToEdit'] && changes['taskToEdit'].currentValue) {
      this.task = changes['taskToEdit'].currentValue;
    }

    if (
      changes['isEdition'] &&
      changes['isEdition'].currentValue !== undefined
    ) {
      console.log(changes['isEdition'].currentValue);
      if (changes['isEdition'].currentValue !== true) {
        this.task = {
          description: '',
          status: TaskStatus.IN_PROGRESS,
          name: '',
        };
      }
    }
  }

  onSubmit() {
    if (this.isEdition) {
      this.api.editTask(this.taskToEdit._id, this.task).subscribe(
        (task) => {
          window.alert('Tarefa editada');
          this.getTasks.emit();
          this.toggleIsEdition.emit();
        },
        (err) => {
          window.alert('Falha ao editar tarefa');
        }
      );
    } else {
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
}
