import { INavData } from "@coreui/angular";
import { AuthService } from "../_services/auth.service";

export class CivilSuiteMenu {

  constructor(private authService: AuthService) {  }

  public makeMenus(menuItems: INavData[]) {
    menuItems.push(
        {
          title: true,
          name: 'দেওয়ানি মামলা'
        }
      );

    if(this.authService.isAuthorizedRight('1000'))
    {
      menuItems.push(
        {
          name: 'নতুন মামলা',
          url: '/civil-suite/new-case',
          icon: 'icon-plus'
        }
      );
    }
    if(this.authService.isAuthorizedRight('1001'))
    {
      menuItems.push(
        {
          name: 'শুনানী মামলার তালিকা',
          url: '/civil-suite/hearingcaselist',
          icon: 'icon-list'
        }
      );
    }
    if(this.authService.isAuthorizedRight('1002'))
    {
      menuItems.push(
        {
          name: 'মামলার তালিকা',
          url: '/civil-suite/caselist',
          icon: 'icon-list'
        }
      );
    }

    if(this.authService.isAuthorizedRight('1005'))
    {
      menuItems.push(
        {
          name: 'মামলা বিস্তারিত',
          url: '/civil-suite/casedetails',
          icon: 'icon-list'
        }
      );
    }

    if(this.authService.isAuthorizedRight('1006'))
    {
      menuItems.push(
        {
          name: 'আপীল মামলার তালিকা',
          url: '/civil-suite/appealcaselist',
          icon: 'icon-list'
        }
      );
    }

    if(this.authService.isAuthorizedRight('1009'))
    {
      menuItems.push(
        {
          name: 'পরাজিত মামলার তালিকা',
          url: '/civil-suite/lostcases',
          icon: 'icon-list'
        }
      );
    }
    if(this.authService.isAuthorizedRight('1010'))
    {
      menuItems.push(
        {
          name: 'এসএমএস নোটিফিকেশন',
          url: '/civil-suite/notifications',
          icon: 'icon-list'
        }
      );
    }
  }
}
