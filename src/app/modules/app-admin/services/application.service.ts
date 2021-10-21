import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../common/_services/crud.service';
import { Application } from '../models/application.model';
import { RightGroup } from '../models/right-group.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService extends CrudService<Application, string> {

  baseUrl = environment.apiUrl + 'applications';
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.apiUrl}applications`);
  }

  // getAll(appCode): Observable<Application[]> {
  //   return this._http.get<Application[]>(this.baseUrl + '/byapplication/' + appCode);
  // }

}
