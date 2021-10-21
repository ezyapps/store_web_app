import { Component, OnInit } from '@angular/core';
import { SignalService } from '../../common/_services/signal.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private signalService: SignalService) {
    this.signalService.setActiveModule('USERS');
  }

  ngOnInit() {
  }

}
