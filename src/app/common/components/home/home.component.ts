import { Component, OnInit } from '@angular/core';
import { SignalService } from '../../_services/signal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private signalService: SignalService) {
    this.signalService.setActiveModule('MAIN');
   }

  ngOnInit() {
  }

}
