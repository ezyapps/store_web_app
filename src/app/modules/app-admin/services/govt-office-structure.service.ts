import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../common/_services/crud.service';
import { GovtOfficeBranch } from '../models/govt-office-branch.model';
import { GovtOfficeStructure } from '../models/govt-office-structure.model';
import { GovtOffice } from '../models/govt-office.model';

@Injectable({
  providedIn: 'root'
})
export class GovtOfficeStructureService extends CrudService<GovtOfficeStructure, string> {

  baseUrl = environment.apiUrl + 'officestructures';
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.apiUrl}officestructures`);
  }

  getAllByOfficeBranch(branchId): Observable<GovtOfficeStructure[]> {
    return this._http.get<GovtOfficeStructure[]>(this.baseUrl + '/bybranchid/' + branchId);
  }
  getAllByOfficeId(officeId): Observable<GovtOfficeStructure[]> {
    return this._http.get<GovtOfficeStructure[]>(this.baseUrl + '/byofficeid/' + officeId);
  }
}
