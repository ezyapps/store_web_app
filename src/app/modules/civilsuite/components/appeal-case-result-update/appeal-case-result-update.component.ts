import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertifyService } from '../../../../common/_services/alertify.service';
import { CaseHearingDateService } from '../../services/case-hearingdate.service';
import { CivilAppealCaseService } from '../../services/civil-appeal-case.service';
import { CivilCaseService } from '../../services/civilcase.service';

@Component({
  selector: 'app-appeal-case-result-update',
  templateUrl: './appeal-case-result-update.component.html',
  styleUrls: ['./appeal-case-result-update.component.scss']
})
export class AppealCaseResultUpdateComponent implements OnInit {
  model: any = {};
  caseResult: number = 0;
  //caseDetails: any = {};
  @Input() appealCaseDetails: any = {};
  @Input() caseId: string;
  @Output() caseResultUpdated = new EventEmitter();
  constructor(
    private twister: AlertifyService,
    private appealCaseService: CivilAppealCaseService,
    private caseHearingDateService: CaseHearingDateService,
    private caseService: CivilCaseService
  ) { }

  ngOnInit() {
    console.log(this.appealCaseDetails);
  }
  updateResult() {
    this.appealCaseService.updateCaseStatus(this.caseId, this.appealCaseDetails.refCaseId, (this.caseResult==1)? 'আপীল জয়ী':'আপীল পরাজিত').subscribe(
      (resp: any) => {
        this.twister.success("মামলার ফলাফল সংরক্ষন করা হয়েছে।");
        // this.caseService.updateCaseStatus(this.appealCaseDetails.refCaseId, (this.caseResult==1)? 'আপীল জয়ী':'আপীল পরাজিত').subscribe(
        //   (resp2: any) => {
        //     this.twister.success("মামলার ফলাফল সংরক্ষন করা হয়েছে।");
        //   },error => {
        //     console.log(error.message);
        //   }
        // );
        this.caseResultUpdated.emit('1');
      },
      error => {
        this.twister.error("মামলার ফলাফল সংরক্ষন করা সম্ভব হয়নি। আবার চেষ্টা করুন।");
      }
    )
  }
}
