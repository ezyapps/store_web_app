import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertifyService } from '../../../../common/_services/alertify.service';
import { CaseHearingDateService } from '../../services/case-hearingdate.service';
import { CivilAppealCaseService } from '../../services/civil-appeal-case.service';
import { CivilCaseService } from '../../services/civilcase.service';

@Component({
  selector: 'app-case-hearing-date-update',
  templateUrl: './case-hearing-date-update.component.html',
  styleUrls: ['./case-hearing-date-update.component.scss']
})
export class CaseHearingDateUpdateComponent implements OnInit {

  model: any = {};
  caseDetails: any = {};
  @Input() appealCaseDetails: any = {};
  @Input() caseId: string;
  @Output() addedNewDate = new EventEmitter();
  constructor(
    private twister: AlertifyService,
    private appealCaseService: CivilAppealCaseService,
    private caseHearingDateService: CaseHearingDateService,
    private caseService: CivilCaseService
    ) { }

  ngOnInit() {
    //this.findAppealCase();
  }
  ngOnChanges() {
    //this.findAppealCase();
    // create header using child_id
    //console.log(this.caseProgressModel);
  }

  // findAppealCase() {
  //   this.appealCaseService.findOne(this.caseId).subscribe(
  //     (data: any) => {
  //       this.appealCaseDetails = data;
  //     },
  //     error => {
  //       this.twister.error(error.message);
  //     }
  //   )
  // }

  AddHearingDate(){
    this.model.caseId = this.caseId;
    this.model.caseNo = this.appealCaseDetails.caseNo;
    this.caseHearingDateService.saveNew(this.model).subscribe(
      (data: any) => {
        this.twister.success('Added Successfully');
        this.appealCaseService.updateCaseNextDate({CaseId: this.caseId, ActionDate: this.model.HearingDate}).subscribe(
          (resp: any) => {
            console.log("Appeal Case Next Date has been updated.");
          },
          error => {
            console.log("Failed to update Appeal Case Next Date.");
          }
        )
        this.addedNewDate.emit('1');
      },
      error => {
        this.twister.error(error.message);
      }
    );
  }
}
