import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../common/_services/crud.service';
import { CaseNotificationLog } from '../models/case-notification-log.model';
import { NewCivilCase } from '../models/new-case.model';

@Injectable({
  providedIn: 'root'
})
export class CaseNotificationService extends CrudService<CaseNotificationLog, string> {

  baseUrl = environment.apiUrl + 'civilcasenotification';
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.apiUrl}civilcasenotification`);
  }
  getAllNotifications(searchModel): Observable<any> {
    return this._http.post<any[]>(this.baseUrl+ '/getnotifications', searchModel);
  }

  
}
