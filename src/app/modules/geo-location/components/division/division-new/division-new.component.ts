import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';
import { AlertifyService } from '../../../../../common/_services/alertify.service';
import { GeoDivision } from '../../../models/geo-division.model';
import { DivisionService } from '../../../services/division.service';

@Component({
  selector: 'app-division-new',
  templateUrl: './division-new.component.html',
  styleUrls: ['./division-new.component.scss']
})
export class DivisionNewComponent implements OnInit {
  model: any = {};
  @Input()
  set inpModel(inpModel: GeoDivision) {
    this.model = inpModel;
  }
  @Output() onCreatedEvent = new EventEmitter<GeoDivision>();
  frmModel: any = {};
  constructor(
    // private ref: DynamicDialogRef,
    // private config: DynamicDialogConfig,
    private divisionService: DivisionService,
    private alertify: AlertifyService) { }

  ngOnInit() {
  }
  saveDivision() {
    if(this.model !== null)
    {
      //console.log(this.model);
      if(!this.model.id) {
        this.createNew();
      }else {
        this.updateDivision();
      }
    }

  }

  createNew() {
    this.divisionService.save(this.model).subscribe((data: GeoDivision) => {
      this.onCreatedEvent.emit(data);
    },
    error => {
      this.alertify.error(error.message);
      console.log(error);
    });
  }

  updateDivision() {
    console.log(this.model);
    this.divisionService.update(this.model.id, this.model).subscribe((data: GeoDivision) => {
      this.onCreatedEvent.emit(data);
    },
    error => {
      this.alertify.error(error.message);
      console.log(error);
    });
  }
}
