import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../common/_services/crud.service';
import { GovtOfficeBranch } from '../models/govt-office-branch.model';
import { GovtOffice } from '../models/govt-office.model';

@Injectable({
  providedIn: 'root'
})
export class GovtOfficeBranchService extends CrudService<GovtOfficeBranch, string> {

  baseUrl = environment.apiUrl + 'officebranches';
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.apiUrl}officebranches`);
  }

  getAllByOffice(officeId): Observable<GovtOfficeBranch[]> {
    return this._http.get<GovtOfficeBranch[]>(this.baseUrl + '/byofficeid/' + officeId);
  }
}
