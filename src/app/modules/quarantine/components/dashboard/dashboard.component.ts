import { Component, OnInit } from '@angular/core';
import { SignalService } from '../../../../common/_services/signal.service';

@Component({
  selector: 'app-quarantine-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class QuarantineDashboardComponent implements OnInit {

  constructor(
    private signalService: SignalService
  ) {
    this.signalService.setActiveModule('QUARANTINE');
  }

  ngOnInit() {
  }

}
