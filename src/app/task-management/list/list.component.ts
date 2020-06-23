import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../interfaces/task.interface';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input() items: Array<Task>;
  @Output() changeStatus: EventEmitter<Task> = new EventEmitter();
  @Output() edit: EventEmitter<number> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();

  changeItemStatus(task: Task) {
    this.changeStatus.emit(task);
  }

  editItem(id: number) {
    this.edit.emit(id);
  }

  deleteItem(id: number) {
    this.delete.emit(id);
  }
}
