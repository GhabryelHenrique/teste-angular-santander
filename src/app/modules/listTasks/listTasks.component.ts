import { Component, OnInit } from "@angular/core";
import { StatusTask, TaskItem } from "./models/task.model";
import { TaskService } from "./services/task.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { ToastService } from "src/app/core/services/toast.service";

@Component({
  selector: "app-listTasks",
  templateUrl: "./listTasks.component.html",
  styleUrls: ["./listTasks.component.scss"],
})
export class ListTasksComponent implements OnInit {
  tableColumns = ["Título", "Descrição", "Status"];
  tableData$: Observable<TaskItem[]>;
  tasks: TaskItem[];
  tasksFinished: TaskItem[];

  constructor(
    private taskService: TaskService,
    private router: Router,
    private toast: ToastService
  ) {}
  ngOnInit() {
    this.tableData$ = this.taskService.getTaskList();

    this.tableData$.subscribe((res) => {
      this.tasks = res;
      this.tasksFinished = this.tasks.filter((task: TaskItem) => {
        return task.status === StatusTask.Concluida;
      });
    });
  }

  deleteTask(task: TaskItem) {
    this.toast
      .confirmationAlert({
        title: "Tem certeza que deseja deletar?",
        text: "Tem certesa que deseja apagar " + task.title + "? Essa ação é irreversivel" ,
        icon: "warning",
      })
      .then((result: any) => {
        if(result.value){
          this.taskService.deleteTaskItem(task);
          this.toast.simpleAlert({
            title: "Deletado",
            text: "Task apagada com sucesso" ,
            icon: "success",
          })
        }
      });
  }

  createTask() {
    this.router.navigate(["/createTask"]);
  }
}
