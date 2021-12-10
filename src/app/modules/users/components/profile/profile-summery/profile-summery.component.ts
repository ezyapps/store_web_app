import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { AlertifyService } from '../../../../../common/_services/alertify.service';
import { AuthService } from '../../../../../common/_services/auth.service';
import { SignalService } from '../../../../../common/_services/signal.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-profile-summery',
  templateUrl: './profile-summery.component.html',
  styleUrls: ['./profile-summery.component.scss']
})
export class ProfileSummeryComponent implements OnInit, OnChanges {
  userName: string;
  userRole: string;
  officeBranch: string;
  officeName: string;
  userInfo: any = {};
  baseApiUrl: string;
  subscription: Subscription;
  photoUrl: string;
  constructor(
    private signalService: SignalService,
    private alertify: AlertifyService,
    private router: Router,
    protected authService: AuthService,
    private userService: UserService
  ) {
    this.subscription = this.signalService.getMessage().subscribe(
      message => {
        if (message === 'RELOAD-TOKEN') {
          console.log('Reload Token Signal Received');
          this.setUserInfo();
        }
      });
   }
  ngOnChanges() {
    this.setUserInfo();
  }

  ngOnInit() {
    this.baseApiUrl = environment.baseUrl;
    this.setUserInfo();
  }

  setUserInfo() {
    this.userService.getMe().subscribe(
      (data: any[]) => {
        this.userInfo = data;
        console.log(data);
      },
      error => {

      });
    this.authService.decodeToken();
    if ( this.authService.decodedToken) {
      this.userName = this.authService.decodedToken.name;
      this.userRole = this.authService.decodedToken.roleName;
      this.officeBranch = this.authService.decodedToken.branchName;
      this.officeName = this.authService.decodedToken.officeName;
      this.photoUrl = this.baseApiUrl + this.authService.decodedToken.photoUrl;
    }
  }

}
