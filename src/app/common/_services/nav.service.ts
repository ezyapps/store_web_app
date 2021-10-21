import { Injectable } from '@angular/core';
import { INavData } from '@coreui/angular';
import { CivilSuiteMenu } from '../classes/civil-suite-menu';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NavService {

constructor(
  private authService: AuthService
) { }

makeSideNavigationItems(appCode: string) : INavData[] {
  var menuItems: INavData[] = new Array();
  if(appCode === '100') {
    new CivilSuiteMenu(this.authService).makeMenus(menuItems);
  }
    ///this.makeCivilSuiteMenus(menuItems);

  return menuItems;
}



}
