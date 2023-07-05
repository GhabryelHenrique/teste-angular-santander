import { TestBed } from "@angular/core/testing";

import { TaskService } from "./task.service";
import { StatusTask, TaskItem } from "../models/task.model";
import { Observable, of } from "rxjs";

describe("TaskService", () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(TaskService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should update task status correctly when index > 1", () => {
    const exampleTaskList: TaskItem[] = [
      {
        id: 1,
        title: "Task 1",
        description: "Task 1",
        status: StatusTask.Concluida,
      },
      {
        id: 2,
        title: "Task 2",
        description: "Task 2",
        status: StatusTask.Pendente,
      },
    ];

    const idTask = 1;
    const task: TaskItem = {
      id: 1,
      title: "string",
      description: "string",
      status: StatusTask.Concluida,
    };

    service["taskList"] = exampleTaskList;

    const index = 0;

    const spy = spyOn<any>(service, "savetaskList");

    service.updateTasksStatus(idTask, task);

    expect(service["taskList"][index]).toEqual(task);
    expect(spy).toHaveBeenCalled();
  });

  it("should update task status correctly when index -1", () => {
    const idTask = 3;
    const task: TaskItem = {
      id: 1,
      title: "string",
      description: "string",
      status: StatusTask.Concluida,
    };

    service.updateTasksStatus(idTask, task);
  });

  it("should return task list as an observable", () => {
    const exampleTaskList: TaskItem[] = [
      {
        id: 1,
        title: "Task 1",
        description: "Task 1",
        status: StatusTask.Concluida,
      },
      {
        id: 2,
        title: "Task 2",
        description: "Task 2",
        status: StatusTask.Pendente,
      },
    ];

    spyOn(service["taskListSubject"], "asObservable").and.returnValue(
      of(exampleTaskList)
    );

    const result = service.getTaskList();

    expect(result).toEqual(jasmine.any(Observable));
    result.subscribe((taskList) => {
      expect(taskList).toEqual(exampleTaskList);
    });
  });

  it("should add task to list and next observable", () => {
    let exampleTaskList: TaskItem[] = [
      {
        id: 1,
        title: "Task 1",
        description: "Task 1",
        status: StatusTask.Concluida,
      },
      {
        id: 2,
        title: "Task 2",
        description: "Task 2",
        status: StatusTask.Pendente,
      },
    ];

    const task: TaskItem = {
      id: 1,
      title: "string",
      description: "string",
      status: StatusTask.Concluida,
    };

    service["taskList"] = exampleTaskList;

    spyOn(service["taskListSubject"], "asObservable").and.returnValue(
      of(exampleTaskList)
    );

    const spy = spyOn<any>(service, "savetaskList");

    service.addTaskItem(task);

    exampleTaskList.push(task);

    expect(spy).toHaveBeenCalled();
    expect(service["taskList"]).toEqual(exampleTaskList);
  });

  it("should savetaskList to set item to localstorage", () => {
    let exampleTaskList: TaskItem[] = [
      {
        id: 1,
        title: "Task 1",
        description: "Task 1",
        status: StatusTask.Concluida,
      },
      {
        id: 2,
        title: "Task 2",
        description: "Task 2",
        status: StatusTask.Pendente,
      },
    ];

    service["taskList"] = exampleTaskList;

    service["savetaskList"]();

    const storedTaskList = JSON.parse(localStorage.getItem("taskList"));
    expect(storedTaskList).toEqual(exampleTaskList);
  });

  it('should load task list from localStorage', () => {
    let exampleTaskList: TaskItem[] = [
      {
        id: 1,
        title: "Task 1",
        description: "Task 1",
        status: StatusTask.Concluida,
      },
      {
        id: 2,
        title: "Task 2",
        description: "Task 2",
        status: StatusTask.Pendente,
      },
    ];

    localStorage.setItem('taskList', JSON.stringify(exampleTaskList));

    service['loadtaskList']();

    expect(service['taskList']).toEqual(exampleTaskList);
  });

  it('should not modify task list if localStorage is empty', () => {
    localStorage.removeItem('taskList');

    service['taskList'] = [];

    service['loadtaskList']();

    expect(service['taskList']).toEqual([]);
  });

  it('should delete task item correctly', () => {
    let exampleTaskList: TaskItem[] = [
      {
        id: 1,
        title: "Task 1",
        description: "Task 1",
        status: StatusTask.Concluida,
      },
      {
        id: 2,
        title: "Task 2",
        description: "Task 2",
        status: StatusTask.Pendente,
      },
    ];


    const taskToDelete: TaskItem =  {
      id: 1,
      title: "Task 1",
      description: "Task 1",
      status: StatusTask.Concluida,
    };

    const expectedTaskList: TaskItem[] = [      {
      id: 2,
      title: "Task 2",
      description: "Task 2",
      status: StatusTask.Pendente,
    },];

    service['taskList'] = exampleTaskList;

    service.deleteTaskItem(taskToDelete);

    expect(service['taskList']).toEqual(expectedTaskList);
  });

  it('should delete task but item not found in array', () => {
    let exampleTaskList: TaskItem[] = [
      {
        id: 1,
        title: "Task 1",
        description: "Task 1",
        status: StatusTask.Concluida,
      },
      {
        id: 2,
        title: "Task 2",
        description: "Task 2",
        status: StatusTask.Pendente,
      },
    ];


    const taskToDelete: TaskItem =  {
      id: 3,
      title: "Task 1",
      description: "Task 1",
      status: StatusTask.Concluida,
    };

    service['taskList'] = exampleTaskList;

    service.deleteTaskItem(taskToDelete);

    expect(service['taskList']).toEqual(exampleTaskList);
  });
});
