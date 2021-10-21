import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../common/_services/crud.service';
import { GovtOffice } from '../models/govt-office.model';

@Injectable({
  providedIn: 'root'
})
export class GovtOfficeService extends CrudService<GovtOffice, string> {

  baseUrl = environment.apiUrl + 'offices';
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.apiUrl}offices`);
  }

  getAllByMinistry(ministryId): Observable<GovtOffice[]> {
    return this._http.get<GovtOffice[]>(this.baseUrl + '/byministry/' + ministryId);
  }

  getAllByMinistryOfficeLevel(officeLevelId): Observable<GovtOffice[]> {
    return this._http.get<GovtOffice[]>(this.baseUrl + '/byofficelevel/' + officeLevelId);
  }

  getAllOfficesByGeoLevel(geoLevel): Observable<GovtOffice[]> {
    return this._http.get<GovtOffice[]>(this.baseUrl + '/bygeolevel/' + geoLevel);
  }

  getUpperLevelOfficesByMinistryOfficeLevel(officeLevelId): Observable<GovtOffice[]> {
    return this._http.get<GovtOffice[]>(this.baseUrl + '/upperofficesbyofficelevel/' + officeLevelId);
  }
}
