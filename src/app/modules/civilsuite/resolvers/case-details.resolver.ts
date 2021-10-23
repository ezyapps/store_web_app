import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from '../../../common/_services/alertify.service';
import { CivilCaseService } from '../services/civilcase.service';

@Injectable()
export class CaseDetailsResolver implements Resolve<any>
{
  /**
   *
   */
  constructor(
    private twister: AlertifyService,
    private router: Router,
    private caseService: CivilCaseService
  ) { }
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const caseNo = route.params['caseNo'];
    console.log(caseNo);
    return this.caseService.getAll({caseNo: route.params['caseNo']}).pipe(
      catchError(error => {
          this.twister.error('Problem retrieving data');
          this.router.navigate(['/civil-suite/caselist']);
          return of(null);
      })
  );
  }

}
