import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from '../../../../common/_services/alertify.service';
import { NewCivilAppealCase } from '../../models/new-appeal-case.model';
import { CivilAppealCaseService } from '../../services/civil-appeal-case.service';
import { CivilCaseService } from '../../services/civilcase.service';

@Component({
  selector: 'app-appeal-case-entry',
  templateUrl: './appeal-case-entry.component.html',
  styleUrls: ['./appeal-case-entry.component.scss']
})
export class AppealCaseEntryComponent implements OnInit {
  caseDetails: any = {};
  appealCaseModel: any = {};

  constructor(
    private twister: AlertifyService,
    private caseAppealService: CivilAppealCaseService,
    private caseService: CivilCaseService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      console.log(data['caseDetails']);
      this.caseDetails = data['caseDetails'][0];
      this.appealCaseModel.caseNo = this.caseDetails.caseRefNo;
    },
    error => {
      this.twister.error('Sorry! Can not load case details.');
    }
    );
  }
  createAppealCase() {
    this.twister.confirm('নিশ্চিতকরণ', 'আপিল মামলাটি সংরক্ষন করার জন্য কি আপনি নিশ্চিত?', () => {
      this.appealCaseModel.refCaseId = this.caseDetails.Id;
      this.caseAppealService.saveNew(this.appealCaseModel).subscribe (
        (data: NewCivilAppealCase) => {
          if(data.id != null) {
            this.twister.success('আপিল মামলা টি সফলভাবে সংরক্ষিত হয়েছে।');
            this.router.navigate(['/civil-suite/caselist/']);
          }
        },
        error => {
          this.twister.error(error.message);
        }
      );
    }, () => {});
    console.log(this.appealCaseModel);
  }
}
