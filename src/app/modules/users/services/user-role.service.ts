import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../common/_services/crud.service';


@Injectable({
  providedIn: 'root'
})
export class UserRoleService extends CrudService<any, string> {

  baseUrl = environment.apiUrl + 'userrole';
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.apiUrl}userrole`);
  }

  getAllByUser(userId): Observable<any[]> {
    return this._http.get<any[]>(this.baseUrl + '/byuserid/' + userId);
  }
  getActiveRoleByUser(userId): Observable<any[]> {
    return this._http.get<any[]>(this.baseUrl + '/activerolebyuserid/' + userId);
  }

  assignRole(model): Observable<any> {
    return this._http.post<any>(this._base + '/assignrole', model);
  }

  activateRole(userRoleId): Observable<any>{
    return this._http.get<any[]>(this.baseUrl + '/activaterole/' + userRoleId);
  }
  // getByNID(nid): Observable<any> {
  //   return this._http.get<any>(this.baseUrl + '/bynid/' + nid);
  // }

}
