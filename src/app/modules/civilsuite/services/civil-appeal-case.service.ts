import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../common/_services/crud.service';
import { NewCivilAppealCase } from '../models/new-appeal-case.model';


@Injectable({
  providedIn: 'root'
})
export class CivilAppealCaseService extends CrudService<NewCivilAppealCase, string> {

  baseUrl = environment.apiUrl + 'civilappealcase';
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.apiUrl}civilappealcase`);
  }

  saveNew(model): Observable<any> {
    return this._http.post<any>(this.baseUrl + '/new-case', model);
  }

  updateCaseNextDate(model): Observable<any> {
    return this._http.post<any[]>(this.baseUrl + '/update-case-next-date', model);
  }
  updateCaseStatus(caseId, caseRefId, status:string):Observable<any>{
    return this._http.get<any>(this._base+'/update-case-status/'+ caseId +"/"+ caseRefId +"/"+ status);
  }
  getLostCases(filterObj): Observable<any[]> {
    return this._http.post<any[]>(this.baseUrl + '/lostcases', filterObj);
  }

  getAll(filterObj): Observable<any[]> {
    return this._http.post<any[]>(this.baseUrl + '/withfilter', filterObj);
  }

  getAllWithTopshil() {
    return this._http.get<any[]>(this._base + '/allwithtopshil');
  }

}
