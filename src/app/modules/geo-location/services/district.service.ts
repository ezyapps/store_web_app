import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../common/_services/crud.service';
import { GeoDistrict } from '../models/geo-district.model';

@Injectable({
  providedIn: 'root'
})
export class DistrictService extends CrudService<GeoDistrict, string> {

  baseUrl = environment.apiUrl + 'districts';
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.apiUrl}districts`);
  }

  getAll(parentCode): Observable<GeoDistrict[]> {
    return this._http.get<GeoDistrict[]>(this.baseUrl + '/withparent/' + parentCode);
  }

}
