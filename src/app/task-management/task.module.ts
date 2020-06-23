import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule, 
  MatCardModule, 
  MatInputModule, 
  MatButtonModule, 
  MatExpansionModule, 
  MatAutocompleteModule,
  MatSelectModule } from '@angular/material';

import { TaskViewComponent } from './task-view.component';
import { TaskService } from './task.service';
import { ListComponent } from './list/list.component';
import { TaskComponent } from './task/task.component';
import { TaskResolver } from './task/task.resolver';
import { TaskRoutingModule } from './task-routing.module';

@NgModule({
  declarations: [
    TaskViewComponent,
    ListComponent,
    TaskComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatSelectModule,
    TaskRoutingModule
  ],
  providers: [
    TaskService,
    TaskResolver
  ]
})
export class TaskModule { }
