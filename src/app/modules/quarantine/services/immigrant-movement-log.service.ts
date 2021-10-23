import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../common/_services/crud.service';
import { ImmigrantMovementLog } from '../models/immigrant-movement-log.model';


@Injectable({
  providedIn: 'root'
})
export class ImmigrantMovementLogService  extends CrudService<ImmigrantMovementLog, string> {

  baseUrl = environment.apiUrl + 'immigrantmovementlogs';
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.apiUrl}immigrantmovementlogs`);
  }
  getMovementsByImmigrant(id): Observable<any> {
    return this._http.get<any>(this._base+'/get-movements/'+id);
  }

}
