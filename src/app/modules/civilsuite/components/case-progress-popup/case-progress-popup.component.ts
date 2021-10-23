import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CivilCaseProgress } from '../../models/case-progress.model';

@Component({
  selector: 'app-case-progress-popup',
  templateUrl: './case-progress-popup.component.html',
  styleUrls: ['./case-progress-popup.component.scss']
})
export class CaseProgressPopupComponent implements OnInit {
  caseProgressData: CivilCaseProgress;
  constructor(
    public ref?: DynamicDialogRef,
    public config?: DynamicDialogConfig) { }

  ngOnInit() {
    if(this.config?.data?.caseProgress){
      this.caseProgressData = this.config.data.caseProgress;
    }
  }

  PopupWindow(status){
    if(status === '1') {
      this.ref.close();
    }
  }
}
