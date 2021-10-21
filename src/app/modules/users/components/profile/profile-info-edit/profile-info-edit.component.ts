import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../../../../../common/_services/alertify.service';
import { AuthService } from '../../../../../common/_services/auth.service';
import { SignalService } from '../../../../../common/_services/signal.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-profile-info-edit',
  templateUrl: './profile-info-edit.component.html',
  styleUrls: ['./profile-info-edit.component.scss']
})
export class ProfileInfoEditComponent implements OnInit {

  profileInfo: any = {}
  constructor(
    private userService: UserService,
    private twister: AlertifyService,
    private authService: AuthService,
    private signalService: SignalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadMyInfo();
  }

  saveProfileData(){
    this.twister.confirm('নিশ্চিতকরণ', 'আপনি কি প্রোফাইল তথ্য সংশোধন করার বিষয়ে নিশ্চিত?', () => {
      this.userService.uploadProfile(this.profileInfo).subscribe((data: any) => {
        this.twister.success('প্রফাইল তথ্য সংশোধন সফল ভাবে সম্পন্ন হয়েছে।');
        this.authService.loadActiveToken().subscribe(() => {
          this.signalService.sendMessage('RELOAD-TOKEN');
          this.router.navigate(['/users/profile']);
        });
      },
      error => {
        this.twister.error('প্রফাইল তথ্য সংশোধন সম্পন্ন হয়নি। '+ error.message);
      });
    }, () => {

    })

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
