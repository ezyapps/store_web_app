import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../common/_services/crud.service';
import { CivilCaseProgress } from '../models/case-progress.model';
import { NewCivilCase } from '../models/new-case.model';

@Injectable({
  providedIn: 'root'
})
export class CivilCaseProgressService extends CrudService<CivilCaseProgress, string> {

  baseUrl = environment.apiUrl + 'civilcaseprogress';
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.apiUrl}civilcaseprogress`);
  }

  updateHearingDate(model: any): Observable<any> {
    return this._http.post<any>(this.baseUrl + '/update_hearing_date', model);
  }
  updateSendSFToGpO(model: any): Observable<any> {
    return this._http.post<any>(this.baseUrl + '/update_sf_send2GpO', model);
  }
  updateSignedReplySendToGpO(model: any): Observable<any> {
    return this._http.post<any>(this.baseUrl + '/update_signedreply_sendtoGpO', model);
  }
  updateReplyReceivedFromGpO (model: any): Observable<any> {
    return this._http.post(this.baseUrl+ '/update_reply_receiveFromGpO', model);
  }
  updateSFDate(model: any): Observable<any> {
    return this._http.post<any>(this.baseUrl + '/update_sf_receive', model);
  }
  updateGovtInterest (caseId: string, hasInterest: boolean): Observable<any> {
    return this._http.get(this._base + '/update_govt_interest/' + caseId + '/' + hasInterest);
  }
  updateCaseResult (caseId: string, result: number): Observable<any> {
    return this._http.get(this._base + '/update_case_result/' + caseId + '/' + result);
  }
  getByCaseId(caseId): Observable<CivilCaseProgress> {
    return this._http.get<CivilCaseProgress>(this.baseUrl + '/bycaseid/' + caseId);
  }
  // getAllWithTopshil() {
  //   return this._http.get<any[]>(this._base + '/allwithtopshil');
  // }
}
