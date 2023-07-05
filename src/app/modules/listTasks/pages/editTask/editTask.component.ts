import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { TaskService } from "../../services/task.service";
import { TaskItem } from "../../models/task.model";
import { ToastService } from "src/app/core/services/toast.service";

@Component({
  selector: "app-editTask",
  templateUrl: "./editTask.component.html",
  styleUrls: ["./editTask.component.scss"],
})
export class EditTaskComponent implements OnInit {
  form: FormGroup;
  taskID: string

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private toast: ToastService
  ) {
    this.form = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      status: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.taskID = params['id'];
    });
    this.initForm();
  }

  initForm() {
    this.taskService.getTaskList().subscribe((res) => {
      const task = res.find((task: TaskItem) => task.id === Number(this.taskID));

      this.form.controls['title'].setValue(task.title)
      this.form.controls['description'].setValue(task.description)
      this.form.controls['status'].setValue(task.status)
    });
  }

  createTask() {
    this.taskService.updateTasksStatus(Number(this.taskID), this.form.value);
    this.toast.sendToast('success', 'Tarefa editada com sucesso')
    this.router.navigate(["/"]);
  }
}
