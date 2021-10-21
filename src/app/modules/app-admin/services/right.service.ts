import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../common/_services/crud.service';
import { Right } from '../models/right.model';

@Injectable({
  providedIn: 'root'
})
export class RightService extends CrudService<Right, string> {

  baseUrl = environment.apiUrl + 'rights';
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.apiUrl}rights`);
  }

  getAll(rightGroupId): Observable<Right[]> {
    return this._http.get<Right[]>(this.baseUrl + '/bygroup/' + rightGroupId);
  }

}
