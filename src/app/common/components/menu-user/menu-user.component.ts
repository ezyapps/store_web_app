import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../_services/auth.service';
import { SignalService } from '../../_services/signal.service';

@Component({
  selector: 'app-menu-user',
  templateUrl: './menu-user.component.html',
  styleUrls: ['./menu-user.component.scss']
})
export class MenuUserComponent implements OnInit, OnDestroy, OnChanges {
  userName: string;
  userRole: string;
  officeBranch: string;
  officeName: string;
  subscription: Subscription;
  baseApiUrl: string;
  constructor (
    private signalService: SignalService,
    public authService: AuthService
    ) {
      this.subscription = this.signalService.getMessage().subscribe(
        message => {
          if (message === 'RELOAD-TOKEN') {
            this.setUserInfo();
          }
        });
     }

  ngOnChanges() {
    this.setUserInfo();
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

// this.authService.decodedToken?.PhotoUrl
  ngOnInit() {
    this.setUserInfo();
    this.baseApiUrl = environment.baseUrl;
  }

  setUserInfo() {
    this.authService.decodeToken();
    if ( this.authService.decodedToken) {
      this.userName = this.authService.decodedToken.name;
      this.userRole = this.authService.decodedToken.roleName;
      this.officeBranch = this.authService.decodedToken.branchName;
      this.officeName = this.authService.decodedToken.officeName;
    }
  }
}
