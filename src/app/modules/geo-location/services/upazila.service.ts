import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../common/_services/crud.service';
import { GeoUpazila } from '../models/geo-upazia.module';

@Injectable({
  providedIn: 'root'
})
export class UpazilaService extends CrudService<GeoUpazila, string> {

  baseUrl = environment.apiUrl + 'upazilas';
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.apiUrl}upazilas`);
  }

  getAll(parentCode): Observable<GeoUpazila[]> {
    return this._http.get<GeoUpazila[]>(this.baseUrl + '/withparent/' + parentCode);
  }

}
