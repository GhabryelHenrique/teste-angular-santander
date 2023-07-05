import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastService } from "src/app/core/services/toast.service";
import { TaskService } from "./../../services/task.service";

@Component({
  selector: "app-createTask",
  templateUrl: "./createTask.component.html",
  styleUrls: ["./createTask.component.scss"],
})
export class CreateTaskComponent implements OnInit {
  form: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private taskService: TaskService,
    private toast: ToastService
  ) {
    this.form = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
    });
  }

  ngOnInit() {}

  createTask() {
    this.taskService.addTaskItem(this.form.value);
    this.toast.sendToast("success", "Tarefa criada com sucesso");
    this.router.navigate(["/"]);
  }
}
