import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../common/_services/crud.service';
import { CaseTopshil } from '../models/case-topshil.model';


@Injectable({
  providedIn: 'root'
})
export class CaseTopshilService extends CrudService<CaseTopshil, string> {

  baseUrl = environment.apiUrl + 'civilcasetopshil';
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.apiUrl}civilcasetopshil`);
  }

  getAll(parentCode): Observable<CaseTopshil[]> {
    return this._http.get<CaseTopshil[]>(this.baseUrl + '/withparent/' + parentCode);
  }

}
