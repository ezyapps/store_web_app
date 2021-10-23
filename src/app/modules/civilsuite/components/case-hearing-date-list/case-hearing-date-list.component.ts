import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CaseHearingDate } from '../../models/case-hearing-date.model';

@Component({
  selector: 'app-case-hearing-date-list',
  templateUrl: './case-hearing-date-list.component.html',
  styleUrls: ['./case-hearing-date-list.component.scss']
})
export class CaseHearingDateListComponent implements OnInit, OnChanges {
  @Input() hearingDates: CaseHearingDate[];
  constructor() { }

  ngOnChanges(){
    
  }

  ngOnInit() {
  }

}
