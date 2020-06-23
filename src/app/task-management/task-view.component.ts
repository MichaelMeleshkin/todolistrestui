import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { TaskService } from './task.service';
import { UserInfo } from './interfaces/user-info.interface';
import { Task, taskStatuses } from './interfaces/task.interface';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit, OnDestroy {
  userInfo: UserInfo;
  tasks: Array<Task>;
  taskList: Array<Task>;
  taskControl = new FormControl();
  taskStatusControl = new FormControl();
  statuses = taskStatuses;
  private taskControlSubscription: Subscription;
  private taskStatusControlSubscription: Subscription;

  constructor(
    private router: Router,
    private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getCurrentUser().subscribe((data: UserInfo) => {
      this.userInfo = data;
    });

    this.taskService.getTasks().subscribe((data: Array<Task>) => {
      this.tasks = data;
      this.updateList(data);
    })

    this.taskControlSubscription = this.taskControl.valueChanges
      .pipe(
        tap(() => {
          this.taskStatusControl.setValue('');
        })
      )
      .subscribe((val: string) => {
        const tasks = this.tasks.filter((task: Task) => task.name.toLowerCase().includes(val.toLowerCase()));
        this.updateList(tasks);
      })

    this.taskStatusControlSubscription = this.taskStatusControl.valueChanges.subscribe((val: string) => {
      const tasks = this.tasks.filter((task: Task) => val ? task.status === val : true);
      this.updateList(tasks);
    })
  }

  ngOnDestroy() {
    this.taskControlSubscription.unsubscribe();
    this.taskStatusControlSubscription.unsubscribe();
  }

  onChangeStatus(task: Task) {
    task.status = task.status === "STATUS_TODO" ? "STATUS_DONE" : "STATUS_TODO";
    this.taskService.editTask(task).subscribe();
  }

  onEdit(id: number) {
    this.router.navigateByUrl(`/task/${id}`);
  }

  onDelete(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((task: Task) => task.id !== id);
      this.updateList(this.tasks);
    });
  }

  private updateList(tasks: Array<Task>) {
    this.taskList = Object.assign([], tasks);
  }
}
