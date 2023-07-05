import { Injectable } from '@angular/core';
import { StatusTask, TaskItem } from '../models/task.model';
import { BehaviorSubject, Observable } from 'rxjs';

interface Tasks {
  title: string
  description: string
}

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  private taskList: TaskItem[] = [];
  private taskListSubject: BehaviorSubject<TaskItem[]> = new BehaviorSubject<TaskItem[]>(this.taskList);

  constructor() {
    this.loadtaskList();
  }

  getTaskList(): Observable<TaskItem[]> {
    this.taskListSubject.next(this.taskList)
    return this.taskListSubject.asObservable();
  }

  addTaskItem(task: Tasks) {
    const newTask: TaskItem = {
      id: this.taskList.length + 1,
      title: task.title,
      description: task.description,
      status: StatusTask.Pendente
    };

    this.taskList.push(newTask);
    this.savetaskList();
    this.taskListSubject.next(this.taskList);
  }

  updateTasksStatus(idTask: number, task: TaskItem) {
    const index = this.taskList.findIndex(todo => todo.id === idTask);

    if (index > -1) {
      task.id = index
      this.taskList[index] = task
      this.savetaskList();
      this.taskListSubject.next(this.taskList);
    }
  }

  deleteTaskItem(task: TaskItem) {
    const index = this.taskList.findIndex(item => item.id === task.id);

    if (index > -1) {
      this.taskList.splice(index, 1);
      this.savetaskList();
      this.taskListSubject.next(this.taskList);
    }
  }

  private loadtaskList() {
    const storedList = localStorage.getItem('taskList');
    if (storedList) {
      this.taskList = JSON.parse(storedList);
    }
  }

  private savetaskList() {
    localStorage.setItem('taskList', JSON.stringify(this.taskList));
  }
}
