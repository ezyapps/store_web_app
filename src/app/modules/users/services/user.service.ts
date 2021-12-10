import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../common/_services/crud.service';
import { UserPhoto } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<any, string> {

  baseUrl = environment.apiUrl + 'users';
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.apiUrl}users`);
  }

  getMe(): Observable<any[]> {
    return this._http.get<any[]>(this.baseUrl + '/me');
  }
  uploadPhoto(imgBase64Str): Observable<any> {
    return this._http.post<any>(this.baseUrl + '/upload-photo', {photobase64str: imgBase64Str}, { reportProgress: true});
  }

  uploadProfile(profileModel): Observable<any> {
    return this._http.post<any>(this.baseUrl + '/update-profile', profileModel);
  }

  getPhotos(userId): Observable<UserPhoto[]> {
    return this._http.get<UserPhoto[]>(this.baseUrl + '/get-photos/' + userId);
  }

  getByNID(nid): Observable<any> {
    return this._http.get<any>(this.baseUrl + '/bynid/' + nid);
  }

  getByUserName(username): Observable<any> {
    return this._http.get<any>(this.baseUrl + '/byusername/' + username);
  }

  getByEmail(email): Observable<any> {
    return this._http.get<any>(this.baseUrl + '/byemail/' + email);
  }

}
