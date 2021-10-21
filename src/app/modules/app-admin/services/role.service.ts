import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  baseUrl = environment.apiUrl + 'roles/';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(this.baseUrl);
  }
  getAllByOffice(officeId): Observable<Role[]> {
    return this.http.get<Role[]>(this.baseUrl + officeId);
  }
  getAllByGeoLevel(geoLevel): Observable<Role[]> {
    return this.http.get<Role[]>(this.baseUrl+'getbygeolevel/' + geoLevel);
  }
  getAllByGeoLevelWithCommon(geoLevel): Observable<Role[]> {
    return this.http.get<Role[]>(this.baseUrl+'getbygeolevelwithcommon/' + geoLevel);
  }

  saveRole(model: any): Observable<Role> {
    return this.http.post<Role>(this.baseUrl, model);
  }
}
