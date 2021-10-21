import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AlertifyService } from '../../../common/_services/alertify.service';
import { CrudService } from '../../../common/_services/crud.service';
import { RightGroup } from '../models/right-group.model';

@Injectable({
  providedIn: 'root'
})
export class RightGroupService extends CrudService<RightGroup, string> {

  baseUrl = environment.apiUrl + 'rightgroups';
  constructor(
    protected _http: HttpClient,
    private twister: AlertifyService
    ) {
    super(_http, `${environment.apiUrl}rightgroups`);
  }

  getAll(appCode): Observable<RightGroup[]> {
    return this._http.get<RightGroup[]>(this.baseUrl + '/byapplication/' + appCode);
  }
  getAndFillAll(appCode): RightGroup[] {
    this.getAll(appCode).subscribe(
      (data: RightGroup[]) => {
        //console.log(data);
        return data;
      }, error => {
        this.twister.error(error.message);
        return null;
      }
    );
    return null;
  }
}
