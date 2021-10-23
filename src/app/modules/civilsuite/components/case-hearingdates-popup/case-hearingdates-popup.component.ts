import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AlertifyService } from '../../../../common/_services/alertify.service';
import { CaseHearingDate } from '../../models/case-hearing-date.model';
import { CaseHearingDateService } from '../../services/case-hearingdate.service';
import { CivilAppealCaseService } from '../../services/civil-appeal-case.service';
import { CivilCaseProgressService } from '../../services/civilcase-progress.service';
import { CivilCaseService } from '../../services/civilcase.service';

@Component({
  selector: 'app-case-hearingdates-popup',
  templateUrl: './case-hearingdates-popup.component.html',
  styleUrls: ['./case-hearingdates-popup.component.scss']
})
export class CaseHearingdatesPopupComponent implements OnInit, OnChanges {
  caseId: string;
  appealCaseDetails: any = {};
  hearingDateList: CaseHearingDate[];
  lastHearingDate: CaseHearingDate;
  constructor(
    private twister: AlertifyService,
    private caseAppealService: CivilAppealCaseService,
    private caseHearingDateService: CaseHearingDateService,
    public ref?: DynamicDialogRef,
    public config?: DynamicDialogConfig) { }

  ngOnChanges(){
    this.findAppealCase();
    this.findLastHearingDate();
    this.loadList('1');
  }

  ngOnInit() {
    if(this.config?.data?.caseId){
      this.caseId = this.config.data.caseId;
      this.findAppealCase();
      this.findLastHearingDate();
      this.loadList('1');
    }
  }

  closePopupWindow(paramValue) {
    this.ref.close();
  }

  loadList(event) {
    this.caseHearingDateService.getByCaseId(this.caseId).subscribe(
      (data: CaseHearingDate[]) => {
        this.hearingDateList = data;
        console.log(data);
      }
    )
  }
  findLastHearingDate(){
    this.caseHearingDateService.findLastHearingDate(this.caseId).subscribe(
      (data: CaseHearingDate) => {
        this.lastHearingDate = data;
        console.log(data);
      }
    )
  }
  findAppealCase() {
    this.caseAppealService.findOne(this.caseId).subscribe(
      (data: any) => {
        this.appealCaseDetails = data;
        console.log(data);
      },
      error => {
        this.twister.error(error.message);
      }
    )
  }
}
