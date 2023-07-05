import { CreateTaskComponent } from "./createTask.component";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastService } from "src/app/core/services/toast.service";
import { TaskService } from "./../../services/task.service";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

describe("CreateTaskComponent", () => {
  let component: CreateTaskComponent;
  let fixture: ComponentFixture<CreateTaskComponent>;
  let router: Router;
  let taskService: TaskService;
  let toastService: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTaskComponent],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule],
      providers: [TaskService, ToastService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaskComponent);
    component = fixture.componentInstance;
    taskService = TestBed.get(TaskService);
    router = TestBed.get(Router);
    toastService = TestBed.get(ToastService);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should create Task add a list of tasks ", () => {
    const mockFormValue = {
      title: "",
      description: "",
    };

    const spyOnTask = spyOn(taskService, "addTaskItem");
    const spyOnToast = spyOn(toastService, "sendToast");
    const spyOnRouter = spyOn(router, "navigate");

    component.createTask();

    expect(spyOnTask).toHaveBeenCalledWith(mockFormValue);
    expect(spyOnToast).toHaveBeenCalledWith(
      "success",
      "Tarefa criada com sucesso"
    );
    expect(spyOnRouter).toHaveBeenCalledWith(["/"]);
  });
});
