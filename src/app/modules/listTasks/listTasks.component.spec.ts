import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ListTasksComponent } from "./listTasks.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { ToastService } from "src/app/core/services/toast.service";
import { TaskService } from "./services/task.service";
import { of } from "rxjs";
import { TaskItem, StatusTask } from "./models/task.model";
import { Router } from "@angular/router";

describe("ListTasksComponent", () => {
  let component: ListTasksComponent;
  let fixture: ComponentFixture<ListTasksComponent>;
  let taskService: TaskService;
  let toastService: ToastService;
  let route: Router

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListTasksComponent],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule],
      providers: [TaskService, ToastService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTasksComponent);
    component = fixture.componentInstance;
    taskService = TestBed.get(TaskService);
    route = TestBed.get(Router);
    toastService = TestBed.get(ToastService);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call getTaskList on ngOnInit and set tasks and tasksFinished", () => {
    const taskList: TaskItem[] = [
      {
        id: 1,
        title: "Task 1",
        description: "Description 1",
        status: StatusTask.Concluida,
      },
      {
        id: 2,
        title: "Task 2",
        description: "Description 2",
        status: StatusTask.Pendente,
      },
    ];

    spyOn(taskService, "getTaskList").and.returnValue(of(taskList));

    component.ngOnInit();

    expect(taskService.getTaskList).toHaveBeenCalled();
    expect(component.tasks).toEqual(taskList);
    expect(component.tasksFinished).toEqual([taskList[0]]);
  });

  it('should call taskService.deleteTaskItem and toastService.simpleAlert when deleteTask is called with confirmation', () => {
    const task: TaskItem = { id: 1, title: 'Task 1', description: 'Description 1', status: StatusTask.Concluida };

    spyOn(toastService, 'confirmationAlert').and.returnValue(Promise.resolve({ value: true }));
    spyOn(taskService, 'deleteTaskItem');
    spyOn(toastService, 'simpleAlert');

    component.deleteTask(task);

    expect(toastService.confirmationAlert).toHaveBeenCalled();
  });

  it('should call taskService.deleteTaskItem and toastService.simpleAlert when deleteTask is called with confirmation', () => {
    const task: TaskItem = { id: 1, title: 'Task 1', description: 'Description 1', status: StatusTask.Concluida };

    spyOn(toastService, 'confirmationAlert').and.returnValue(Promise.resolve({ dismiss: 'cancel' }));
    spyOn(taskService, 'deleteTaskItem');
    spyOn(toastService, 'simpleAlert');

    component.deleteTask(task);

    expect(toastService.confirmationAlert).toHaveBeenCalled();
  });

  it('should navigate to "/createTask" when createTask is called', () => {
    spyOn(route, 'navigate');

    component.createTask();

    expect(route.navigate).toHaveBeenCalledWith(['/createTask']);
  });


});
