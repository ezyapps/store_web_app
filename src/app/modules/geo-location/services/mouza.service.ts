import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../common/_services/crud.service';
import { GeoMouza } from '../models/geo-mouza.model';
import { GeoUnion } from '../models/geo-union.module';
import { GeoUpazila } from '../models/geo-upazia.module';

@Injectable({
  providedIn: 'root'
})
export class MouzaService extends CrudService<GeoMouza, string> {

  baseUrl = environment.apiUrl + 'mouzas';
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.apiUrl}mouzas`);
  }

  getAll(parentCode): Observable<GeoMouza[]> {
    return this._http.get<GeoMouza[]>(this.baseUrl + '/withparent/' + parentCode);
  }

}
