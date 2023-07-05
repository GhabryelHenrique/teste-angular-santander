/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditTaskComponent } from './editTask.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastService } from 'src/app/core/services/toast.service';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { StatusTask, TaskItem } from '../../models/task.model';

describe('EditTaskComponent', () => {
  let component: EditTaskComponent;
  let fixture: ComponentFixture<EditTaskComponent>;
  let router: Router;
  let taskService: TaskService;
  let formBuilder: FormBuilder;
  let toastService: ToastService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTaskComponent ],
      imports: [ FormsModule, ReactiveFormsModule,RouterTestingModule ],
      providers: [TaskService, ToastService],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaskComponent);
    component = fixture.componentInstance;
    taskService = TestBed.get(TaskService);
    router = TestBed.get(Router);
    formBuilder = TestBed.get(FormBuilder);
    toastService = TestBed.get(ToastService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with task values on initForm', () => {
    const taskID = '1';
    const taskList: TaskItem[] = [
      { id: 1, title: 'Task 1', description: 'Description 1', status: StatusTask.Concluida },
      { id: 2, title: 'Task 2', description: 'Description 2', status: StatusTask.Pendente }
    ];
    const task = taskList.find((task: TaskItem) => task.id === Number(taskID));
    spyOn(taskService, 'getTaskList').and.returnValue(of(taskList));

    component.taskID = taskID;
    component.initForm();

    expect(taskService.getTaskList).toHaveBeenCalled();
    expect(component.form.controls['title'].value).toEqual(task.title);
    expect(component.form.controls['description'].value).toEqual(task.description);
    expect(component.form.controls['status'].value).toEqual(task.status);
  });

  it('should update tasks status, show toast message, and navigate to "/" on createTask', () => {
    const mockFormValue = {
      title: "",
      description: "",
      status: ''
    };

    const spyTask = spyOn(taskService, 'updateTasksStatus')
    const spyOnToast = spyOn(toastService, "sendToast");
    const spyOnRouter = spyOn(router, "navigate");

    component.createTask();

    expect(spyTask).toHaveBeenCalledWith(Number(component.taskID), mockFormValue);
    expect(spyOnToast).toHaveBeenCalledWith(
      'success', 'Tarefa editada com sucesso'
    );
    expect(spyOnRouter).toHaveBeenCalledWith(["/"]);

  });
});
