import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../../../../common/_services/alertify.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class UserProfileInfoComponent implements OnInit {
  profileInfo: any = {}
  constructor(
    private userService: UserService,
    private twister: AlertifyService
  ) { }

  ngOnInit() {
    this.loadMyInfo();
  }

  loadMyInfo() {
    this.userService.getMe().subscribe((data: any) => {
      this.profileInfo = data;
      console.log(data);
    },
    error => {
      this.twister.error(error.message);
    })
  }

}
