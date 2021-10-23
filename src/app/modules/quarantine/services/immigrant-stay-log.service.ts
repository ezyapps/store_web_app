import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../common/_services/crud.service';
import { ImmigrantStayLog } from '../models/immigrant-stay-log.model';


@Injectable({
  providedIn: 'root'
})
export class ImmigrantStayLogService  extends CrudService<ImmigrantStayLog, string> {

  baseUrl = environment.apiUrl + 'immigrantstaylogs';
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.apiUrl}immigrantstaylogs`);
  }

}
