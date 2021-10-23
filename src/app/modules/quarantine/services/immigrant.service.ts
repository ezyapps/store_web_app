import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../common/_services/crud.service';
import { Immigrant } from '../models/immigrant.model';

@Injectable({
  providedIn: 'root'
})
export class ImmigrantService  extends CrudService<Immigrant, string> {

  baseUrl = environment.apiUrl + 'immigrants';
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.apiUrl}immigrants`);
  }
  getCategories(): Observable<any> {
    return this._http.get<any>(this.baseUrl+ '/get-categories');
  }
  update_refer_quarantine(model): Observable<any> {
    return this._http.post<any>(this.baseUrl+'/update-refer-quarantine', model);
  }
  createNew(model): Observable<any> {
    return this._http.post<any>(this._base+'/new-immigrant', model);
  }

  getListWithFilter(searchModel): Observable<any> {
    return this._http.post<any>(this._base + '/getlistwithfilter', searchModel);
  }

  moveImmigrant(model): Observable<any> {
    return this._http.post<any>(this.baseUrl+'/move-immigrant', model);
  }
}
