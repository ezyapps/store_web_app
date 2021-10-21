import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileEditMode: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  toggleProfileInfoView(){
    this.profileEditMode = !this.profileEditMode;
  }
}
