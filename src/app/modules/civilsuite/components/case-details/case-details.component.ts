import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { AlertifyService } from '../../../../common/_services/alertify.service';
import { CivilCaseProgress } from '../../models/case-progress.model';
import { CivilCaseProgressService } from '../../services/civilcase-progress.service';
import { CivilCaseService } from '../../services/civilcase.service';
import { CaseProgressPopupComponent } from '../case-progress-popup/case-progress-popup.component';

@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.less'],
  providers: [DialogService]
})
export class CaseDetailsComponent implements OnInit, OnChanges {
  caseDetails: any = {};
  searchModel: any = {};
  caseSFModel: any = {};
  caseSF2GpOModel: any = {};
  caseProgressModel: CivilCaseProgress;
  currentStage: number = 0;
  hasGovtInterest: boolean = false;
  caseResult: boolean = false;
  constructor(
    private twister: AlertifyService,
    private caseService: CivilCaseService,
    private caseProgressService: CivilCaseProgressService,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) { }

  ngOnChanges() {

  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      console.log(data['caseDetails']);
      this.caseDetails = data['caseDetails'][0];
      this.searchModel.caseNo = this.caseDetails.CaseNo;
      this.loadCaseProgress();
    },
    error => {
      this.searchModel.caseNo = 'D-111';
    }
    );

  }

  loadCaseProgress(){
    this.caseProgressService.getByCaseId(this.caseDetails?.CaseId).subscribe(
      (data: CivilCaseProgress) => {
        this.caseProgressModel = data;
        // console.log(data);
        // this.getCurrentStage();
      }, error => {
        this.twister.error('Sorry! Failed to load case progress. ' + error.message);
        this.caseProgressModel = null;
      }
    );
  }
  loadProgressWindow(caseId){
    this.caseProgressService.getByCaseId(caseId).subscribe(
      (repoData: CivilCaseProgress) => {
          const ref = this.dialogService.open(CaseProgressPopupComponent, {
            data: {
                caseProgress: repoData
            },
            width: '50%'
        });
      }, error => {
        this.twister.error('Sorry! Failed to load case progress. ' );

      }
    );
  }
  findCase() {
    this.caseService.getAll(this.searchModel).subscribe(
      (data: any[]) => {
        this.caseDetails = data[0];
        this.loadCaseProgress();
        console.log(this.caseDetails);
      },
      error => {
        this.twister.error(error.message);
        this.caseDetails = null;
      }
    );
  }
}
