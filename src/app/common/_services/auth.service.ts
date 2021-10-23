import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import {environment} from '../../../environments/environment';
import { Observable } from 'rxjs';
import { GovtOfficeStructureRight } from '../../modules/app-admin/models/govt-office-structure-right.model';
import { INavData } from '@coreui/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userApps: GovtOfficeStructureRight[];
  userAllRights: GovtOfficeStructureRight[];

  jwtHelper = new JwtHelperService();
  decodedToken: any;
  baseUrl = environment.apiUrl + 'auth/';
  constructor(private http: HttpClient) {

   }

  login(model: any) {
    console.log(this.baseUrl + 'login');
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodeToken();
        }
      })
    );
  }

  isAuthorizedAppModule(appCode: string) {
    try {
      if (this.decodedToken.IsSuperAdmin === '1') {
        return true;
      } else {
        const obj = this.userApps?.find(r => r.appCode === appCode);
        return obj !== undefined;
      }
    } catch {
      return false;
    }

  }

  isAuthorizedRight(rightCode: string) {
    try {
      if (this.decodedToken.IsSuperAdmin === '1') {
        return true;
      } else {
        return this.userAllRights?.find(r => r.rightCode === rightCode) !== undefined;
      }
    } catch {
      return false;
    }

  }

  getSideMenuItems(appCode) {
    // tslint:disable-next-line:prefer-const
    let menus: INavData[];
    menus.push();
  }
  loadAuthApps() {
    this.loadAuthorizedAppModules().subscribe(
      (data: any) => {
        this.userApps = data;

      }, error => {
        // this.alertify.error('Sorry! Failed to load User\'s Authorized App Modules.');
      }
    );
  }
  loadUserRights() {
    this.loadAuthorizedRights().subscribe(
      (data: any) => {
        this.userAllRights = data;
      }, error => {
        console.log('Error extracting user rights, Message: ' + error.message);
      }
      );
  }

  loadAuthorizedAppModules(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'authorized-apps');
  }

  loadAuthorizedRights(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'authorized-rights');
  }

  loadAuthorizedRightsByGroupId(rightGroupId: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'authorized-rightsbygroup/' + rightGroupId);
  }

  loadAuthorizedRightsByAppCode(appCode: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'authorized-rightsbyappcode/' + appCode);
  }


  loadActiveToken() {
    return this.http.get(this.baseUrl + 'generatetoken').pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodeToken();
        }
      })
    );
  }

  isTokenExpired() {
    const token = localStorage.getItem('token');
    return this.jwtHelper.isTokenExpired(token);
  }
  decodeToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.decodedToken = this.jwtHelper.decodeToken(token);
      this.loadAuthApps();
      this.loadUserRights();
    }
    console.log(this.decodedToken);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
