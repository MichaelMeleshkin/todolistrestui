import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TaskService } from '../task.service';
import { Task } from '../interfaces/task.interface';


@Injectable()
export class TaskResolver implements Resolve<Observable<Task>> {
  constructor(private taskService: TaskService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Task> {
    return this.taskService.getTask(parseInt(route.paramMap.get('id')));
  }
}