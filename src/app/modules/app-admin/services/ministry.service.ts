import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../common/_services/crud.service';
import { Ministry } from '../models/ministry.model';
import { Right } from '../models/right.model';

@Injectable({
  providedIn: 'root'
})
export class MinistryService extends CrudService<Ministry, string> {

  baseUrl = environment.apiUrl + 'ministries';
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.apiUrl}ministries`);
  }

  getAll(rightGroupId): Observable<Ministry[]> {
    return this._http.get<Ministry[]>(this.baseUrl + '/bygroup/' + rightGroupId);
  }

}
