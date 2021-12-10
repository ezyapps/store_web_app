import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AlertifyService } from '../../common/_services/alertify.service';
import { AuthService } from '../../common/_services/auth.service';
import { NavService } from '../../common/_services/nav.service';
import { SignalService } from '../../common/_services/signal.service';
import { GovtOfficeStructureRight } from '../../modules/app-admin/models/govt-office-structure-right.model';
import { UserRole } from '../../modules/users/models/user-roles.model';
import { UserRoleService } from '../../modules/users/services/user-role.service';
import { navItems } from '../../_nav';
import { appAdminNavItems } from '../../_nav.app-admin';
import { civilSuiteNavItems } from '../../_nav.civil-suite';
import { quarantineNavItems } from '../../_nav.quarantine';
import { userMgtNavItems } from '../../_nav.user-mgt';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;

  userRoles: UserRole[];

  public navItems = navItems;
  subscription: Subscription;
  baseUrl: string;
  trainingMode: boolean;
  baseApiUrl: string;

  constructor(
    private signalService: SignalService,
    private alertify: AlertifyService,
    private router: Router,
    public authService: AuthService,
    private userRoleService: UserRoleService,
    private navService: NavService
    ) {
    this.subscription = this.signalService.getActiveModuleName().subscribe(
      message => {
        switch (message) {
          case 'CIVILSUITE': {
              this.navItems = this.navService.makeSideNavigationItems('100'); // civilSuiteNavItems;
              console.log(this.navItems);
              break;
            }
          case 'APPADMIN': {
            this.navItems = appAdminNavItems;
            break;
          }
          case 'USERS': {
            this.navItems = userMgtNavItems;
            break;
          }
          case 'QUARANTINE': {
            this.navItems = quarantineNavItems;
            break;
          }
          default: {
            this.navItems = navItems;
          }
        }
      });
  }

  ngOnInit(): void {

    if (this.authService.isTokenExpired()) {
      this.router.navigate(['/login']);
    }

    this.authService.decodeToken();

    if ( this.authService.decodedToken) {
      this.loadUserRoles();
      // this.loadAuthApps();
    } else {
      this.router.navigate(['/login']);
    }
    this.baseUrl = environment.apiUrl;
    this.trainingMode = environment.trainingMode;
    this.baseApiUrl = environment.baseUrl;
    console.log(this.router.url);

    if (this.router.url.includes('civil-suite')) {
      this.signalService.setActiveModule('CIVILSUITE');
    } else if (this.router.url.includes('users')) {
      this.signalService.setActiveModule('USERS');
    } else if (this.router.url.includes('geo-loc')) {
      this.signalService.setActiveModule('APPADMIN');
    } else if (this.router.url.includes('app-admin')) {
      this.signalService.setActiveModule('APPADMIN');
    }

  }



  loadUserRoles() {
    const userId = this.authService.decodedToken.id;
    this.userRoleService.getAllByUser(userId).subscribe((data: any) => {
      this.userRoles = data;
      console.log(data);
    },
    error => {
      this.alertify.error(error.message);
    });
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  profile() {
    this.router.navigate(['/users/profile']);
  }
  logout() {
    localStorage.removeItem('token');
    console.log('Logged out');
    this.alertify.message('Logged Out');
    this.router.navigate(['/login']);
  }
}
