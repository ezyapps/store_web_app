import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../common/_services/crud.service';
import { Application } from '../models/application.model';
import { OfficeApplication } from '../models/office-application.model';
import { RightGroup } from '../models/right-group.model';

@Injectable({
  providedIn: 'root'
})
export class OfficeApplicationService extends CrudService<OfficeApplication, string> {

  baseUrl = environment.apiUrl + 'officeapplications';
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.apiUrl}officeapplications`);
  }

  getAppsByOfficeId(officeId: string): Observable<any>{
    return this._http.get<any>(this._base+'/getbyofficeid/'+officeId);
  }
  
  // getAll(appCode): Observable<Application[]> {
  //   return this._http.get<Application[]>(this.baseUrl + '/byapplication/' + appCode);
  // }

}
