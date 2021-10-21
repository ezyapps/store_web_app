import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../common/_services/crud.service';
import { GeoUnion } from '../models/geo-union.module';
import { GeoUpazila } from '../models/geo-upazia.module';

@Injectable({
  providedIn: 'root'
})
export class UnionService extends CrudService<GeoUnion, string> {

  baseUrl = environment.apiUrl + 'unions';
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.apiUrl}unions`);
  }

  getAll(parentCode): Observable<GeoUnion[]> {
    return this._http.get<GeoUnion[]>(this.baseUrl + '/withparent/' + parentCode);
  }

}
