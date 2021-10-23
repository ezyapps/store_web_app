import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../common/_services/crud.service';
import { NewCivilCase } from '../models/new-case.model';

@Injectable({
  providedIn: 'root'
})
export class CivilCaseService extends CrudService<NewCivilCase, string> {

  baseUrl = environment.apiUrl + 'civilcase';
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.apiUrl}civilcase`);
  }
  getAllCaseStatus(): Observable<any> {
    return this._http.get<any>(this.baseUrl+'/case-statuses');
  }
  saveNew(model): Observable<any> {
    return this._http.post<any>(this.baseUrl + '/new-case', model);
  }
  updateRefCaseId(caseId, refCaseNo): Observable<any> {
    return this._http.get<any>(this.baseUrl + '/updaterefcaseno/'+ caseId +'/'+refCaseNo);
  }
  updateCaseStatus(caseId:string, status:string): Observable<any> {
    return this._http.get<any>(this.baseUrl + '/update-case-status/'+ caseId +'/'+status);
  }
  getLostCases(filterObj): Observable<any[]> {
    return this._http.post<any[]>(this.baseUrl + '/lostcases', filterObj);
  }
  getAll(filterObj): Observable<any[]> {
    return this._http.post<any[]>(this.baseUrl + '/withfilter', filterObj);
  }

  getStatusWiseSummary(filterObj): Observable<any> {
    return this._http.post<any[]>(this.baseUrl + '/statuswisesummary', filterObj);
  }

  getAllWithTopshil() {
    return this._http.get<any[]>(this._base + '/allwithtopshil');
  }
}
