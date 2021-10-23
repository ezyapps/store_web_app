import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../common/_services/crud.service';
import { CaseHearingDate } from '../models/case-hearing-date.model';
import { CivilCaseProgress } from '../models/case-progress.model';
import { NewCivilCase } from '../models/new-case.model';

@Injectable({
  providedIn: 'root'
})
export class CaseHearingDateService extends CrudService<CivilCaseProgress, string> {

  baseUrl = environment.apiUrl + 'civilcasehearingdate';
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.apiUrl}civilcasehearingdate`);
  }
  saveNew(model){
    return this._http.post<any>(this.baseUrl + '/add-new', model);
  }

  updateHearingDate(model: any): Observable<any> {
    return this._http.post<any>(this.baseUrl + '/update_hearing_date', model);
  }

  findLastHearingDate(caseId): Observable<CaseHearingDate> {
    return this._http.get<CaseHearingDate>(this.baseUrl + '/lastDateByCaseid/' + caseId);
  }

  getByCaseId(caseId): Observable<CaseHearingDate[]> {
    return this._http.get<CaseHearingDate[]>(this.baseUrl + '/bycaseid/' + caseId);
  }

  getRegularCasesByHearingDates(searchModel): Observable<any[]> {
    return this._http.post<any[]>(this.baseUrl+ '/RegularCasesByHearingDates', searchModel);
  }

  getAppealCasesByHearingDates(searchModel): Observable<any[]> {
    return this._http.post<any[]>(this.baseUrl+ '/AppealCasesByHearingDates', searchModel);
  }
  
  // getAllWithTopshil() {
  //   return this._http.get<any[]>(this._base + '/allwithtopshil');
  // }
}
