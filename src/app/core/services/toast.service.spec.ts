import { TestBed } from "@angular/core/testing";
import { AlertOptions, ToastService } from "./toast.service";
import Swal, { SweetAlertIcon } from "sweetalert2";

describe("Service: Toast", () => {
  let service: ToastService;
  let mixinSpy: jasmine.SpyObj<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastService, Swal],
    });

    mixinSpy = jasmine.createSpyObj<any>("Toast", ["fire"]);
    spyOn(Swal, "mixin").and.returnValue(mixinSpy);
  });

  beforeEach(() => {
    service = TestBed.get(ToastService);
  });

  it("deve chamar o método mixin do Swal com os parâmetros corretos no sendToast", () => {
    const iconToast: SweetAlertIcon = "success";
    const titleToast = "Mensagem de sucesso";

    service.sendToast(iconToast, titleToast);
  });

  it("deve chamar o método mixin do Swal com os parâmetros corretos no sendToast", () => {
    const alertOptions = {
      title: "string",
      text: "string",
      icon: "success" as SweetAlertIcon ,
    };

    service.simpleAlert(alertOptions);
  });

  it("deve chamar o método mixin do Swal com os parâmetros corretos no sendToast", () => {
    const alertOptions = {
      title: "string",
      text: "string",
      icon: "success" as SweetAlertIcon ,
    };

    service.confirmationAlert(alertOptions);
  });
});
