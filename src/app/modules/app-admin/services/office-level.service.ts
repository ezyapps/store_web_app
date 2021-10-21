import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../common/_services/crud.service';
import { OfficeLevel } from '../models/office-level.model';

@Injectable({
  providedIn: 'root'
})
export class OfficeLevelService extends CrudService<OfficeLevel, string> {

  baseUrl = environment.apiUrl + 'officelevels';
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.apiUrl}officelevels`);
  }

  getAll(ministryId): Observable<OfficeLevel[]> {
    return this._http.get<OfficeLevel[]>(this.baseUrl + '/byministry/' + ministryId);
  }

}
