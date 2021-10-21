import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../common/_services/crud.service';
import { GovtOfficeBranch } from '../models/govt-office-branch.model';
import { GovtOfficeStructureRight } from '../models/govt-office-structure-right.model';
import { GovtOfficeStructure } from '../models/govt-office-structure.model';
import { GovtOffice } from '../models/govt-office.model';

@Injectable({
  providedIn: 'root'
})
export class GovtOfficeStructureRightService extends CrudService<GovtOfficeStructureRight, string> {

  baseUrl = environment.apiUrl + 'OfficeStructureRights';
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.apiUrl}OfficeStructureRights`);
  }

  createNew(model): Observable<any> {
    return this._http.post<any>(this._base+'/create-new', model);
  }
  
  getAllByOfficeStructureId(structureId): Observable<GovtOfficeStructureRight[]> {
    return this._http.get<GovtOfficeStructureRight[]>(this.baseUrl + '/byofficestructure/' + structureId);
  }
}
