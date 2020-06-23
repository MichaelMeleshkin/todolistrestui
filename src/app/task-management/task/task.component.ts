import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../interfaces/task.interface';
import { TaskService } from '../task.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  form: FormGroup;
  name: string;
  btnName: string;
  
  private task: Task;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {
    const { data } = this.route.snapshot;
    this.name = data.name;
    this.btnName = data.button;
    this.task = data.task;
  }

  ngOnInit() {
    let name = '';
    let description = '';
    if (this.task) {
      name = this.task.name;
      description = this.task.description
    }
    this.form = this.fb.group({
      name: [name, Validators.required],
      description: [description, Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      let data = this.form.value
      let observable$: Observable<void>;
      if (this.task) {
        data.id = this.task.id;
        observable$ = this.taskService.editTask(data);
      } else {
        observable$ = this.taskService.createTask(data);
      }
      observable$.subscribe(() => {
        this.router.navigateByUrl('/tasks');
      });
    }
  }
}
