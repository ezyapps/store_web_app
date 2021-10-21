import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../common/_services/crud.service';
import { GeoDivision } from '../models/geo-division.model';

@Injectable({
  providedIn: 'root'
})
export class DivisionService extends CrudService<GeoDivision, string> {

  baseUrl = environment.apiUrl + 'divisions/';
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.apiUrl}divisions`);
  }

  // getAll(): Observable<GeoDivision[]> {
  //   return this.http.get<GeoDivision[]>(this.baseUrl);
  // }
}
