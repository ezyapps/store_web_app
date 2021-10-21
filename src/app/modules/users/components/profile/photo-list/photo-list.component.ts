import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../../../../common/_services/alertify.service';
import { AuthService } from '../../../../../common/_services/auth.service';
import { UserPhoto } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-profile-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class ProfilePhotoListComponent implements OnInit {
  userPhotos: UserPhoto[];
  constructor(
    private twister: AlertifyService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.decodeToken();
    this.userService.getPhotos(this.authService.decodedToken.nameid).subscribe(
      (data: UserPhoto[]) => {
        this.userPhotos = data;
        console.log(data);
      },
      error => {
        this.twister.error('');
      }
    )
  }

}
