import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalService {
private subject = new Subject<any>();
constructor() { }

setActiveModule(moduleName: string) {
  this.subject.next(moduleName);
}
sendMessage(msg: string) {
  this.subject.next(msg);
}

getMessage(): Observable<string> {
  return this.subject.asObservable();
}
sendCaseId(caseId: string) {
  this.subject.next(caseId);
}

getCaseId(): Observable<string> {
  return this.subject.asObservable();
}

getActiveModuleName(): Observable<any> {
  return this.subject.asObservable();
}

}
