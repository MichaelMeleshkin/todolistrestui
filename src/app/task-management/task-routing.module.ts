import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskViewComponent } from './task-view.component';
import { AuthGuard } from '../auth/auth.guard';
import { TaskComponent } from './task/task.component';
import { TaskResolver } from './task/task.resolver';
import { Task } from './interfaces/task.interface';

const routes: Routes = [
  { 
    path: 'tasks',
    component: TaskViewComponent,
    canActivate: [AuthGuard] },
  { 
    path: 'task', 
    component: TaskComponent, 
    canActivate: [AuthGuard],
    data: {
      name: "Create task",
      button: "Create"
    }
  },
  { 
    path: 'task/:id', 
    component: TaskComponent, 
    canActivate: [AuthGuard], 
    resolve: {
      task: TaskResolver,
    },
    data: {
      name: "Edit task",
      button: "Edit"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
