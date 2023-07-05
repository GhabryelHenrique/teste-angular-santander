import { Injectable } from "@angular/core";
import Swal, { SweetAlertIcon } from "sweetalert2";

export interface AlertOptions {
  title: string,
  text: string,
  icon: SweetAlertIcon,
}

@Injectable({
  providedIn: "root",
})

export class ToastService {
  constructor() {}

  sendToast(iconToast: SweetAlertIcon, titleToast: string): void {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    Toast.fire({
      icon: iconToast,
      title: titleToast,
    });
  }

  simpleAlert(alertOptions: AlertOptions){
    Swal.fire(
      alertOptions.title,
      alertOptions.text,
      alertOptions.icon
    )
  }

  confirmationAlert(alertOptions: AlertOptions): Promise<any>{
    return Swal.fire({
      title: alertOptions.title,
      text: alertOptions.text,
      icon: alertOptions.icon,
      showCancelButton: true,
      confirmButtonColor: '#1E6F9F',
      cancelButtonColor: '#E25858',
      confirmButtonText: 'Sim'
    })
  }
}
