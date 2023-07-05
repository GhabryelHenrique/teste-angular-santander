import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTasksComponent } from './listTasks.component';
import { RouterModule, Routes } from '@angular/router';
import { CreateTaskComponent } from './pages/createTask/createTask.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditTaskComponent } from './pages/editTask/editTask.component';

const routes: Routes = [
  {
    path: '',
    component: ListTasksComponent
  },
  {
    path: 'createTask',
    component: CreateTaskComponent
  },
  {
    path: 'editTask/:id',
    component: EditTaskComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [ListTasksComponent, CreateTaskComponent,EditTaskComponent]
})
export class ListTasksModule { }
