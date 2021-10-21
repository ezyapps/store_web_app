import { Component, OnInit } from '@angular/core';
import { SignalService } from '../../common/_services/signal.service';

@Component({
  selector: 'app-app-admin',
  templateUrl: './app-admin.component.html',
  styleUrls: ['./app-admin.component.less']
})
export class AppAdminComponent implements OnInit {

  constructor(private signalService: SignalService) {
    this.signalService.setActiveModule('APPADMIN');
  }

  ngOnInit() {
  }

}
