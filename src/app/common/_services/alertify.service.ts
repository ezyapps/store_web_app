import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }
confirm(title: string, message: string, okCallback: () => any, noCallback: () => any) {
  alertify.confirm(title, message, (e: any) => {
    if (e) {
      okCallback();
    } else {}
  },
  (n: any) => {
    if (n) {
      noCallback();
    }
  });
}

success(message: string) {
  alertify.success(message);
}
error(message: string) {
  alertify.error(message);
}
warning(message: string) {
  alertify.warning(message);
}
message(message: string) {
  alertify.message(message);
}
}
