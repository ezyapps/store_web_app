import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../common/_services/crud.service';

import { QuarantineCenter } from '../models/quarantine-center.model';

@Injectable({
  providedIn: 'root'
})
export class QuarantineCenterService  extends CrudService<QuarantineCenter, string> {

  baseUrl = environment.apiUrl + 'quarantinecenters';
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.apiUrl}quarantinecenters`);
  }
  
  findAllWithFilter(searchModel): Observable<QuarantineCenter[]>{
    return this._http.post<QuarantineCenter[]>(this.baseUrl+ '/getbyfilter', searchModel);
  }
}
