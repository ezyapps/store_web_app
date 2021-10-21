import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../../../../common/_services/alertify.service';
import { GovtOfficeBranch } from '../../../models/govt-office-branch.model';
import { GovtOffice } from '../../../models/govt-office.model';
import { Ministry } from '../../../models/ministry.model';
import { OfficeLevel } from '../../../models/office-level.model';
import { GovtOfficeBranchService } from '../../../services/govt-office-branch.service';
import { GovtOfficeService } from '../../../services/govt-office.service';
import { MinistryService } from '../../../services/ministry.service';
import { OfficeLevelService } from '../../../services/office-level.service';

@Component({
  selector: 'app-office-branch',
  templateUrl: './office-branch.component.html',
  styleUrls: ['./office-branch.component.scss']
})
export class OfficeBranchComponent implements OnInit {

  model: any = {};
  ministries: Ministry[];
  officeLevels: OfficeLevel[];
  offices: GovtOffice[];
  officeBranches: GovtOfficeBranch[];
  
  constructor(
    private ministryService: MinistryService,
    private officeLevelService:  OfficeLevelService,
    private officeService:  GovtOfficeService,
    private twister: AlertifyService,
    private officeBranchService: GovtOfficeBranchService
  ) { }

  ngOnInit() {
    this.loadMinistries();
  }

  loadMinistries(){
    this.ministryService.findAll().subscribe(
      (data: Ministry[]) => {
        this.ministries = data;
      },
      error => {
        this.twister.error(error.message);
      }
    )
  }

  loadOffices() {
    this.officeService.getAllByMinistryOfficeLevel(this.model.officeLevelId).subscribe (
      (data: GovtOffice[]) => {
        this.offices = data;
      }, error => {
        this.twister.error(error.message);
      }
    );
  }

  loadOfficeLevels() {
    this.officeLevelService.getAll(this.model.ministryId).subscribe(
      (data: OfficeLevel[]) => {
        this.officeLevels = data;
      },
      error => {
        this.twister.error(error.message);
      }
    )
  }
  loadOfficeBranches(){
    this.officeBranchService.getAllByOffice(this.model.officeId).subscribe(
      (data: GovtOfficeBranch[]) => {
        this.officeBranches = data;
      },
      error => {
        this.twister.error(error.message);
      }
    )
  }
  saveNewOfficeBranch() {
    this.officeBranchService.save(this.model).subscribe(
      (data: GovtOfficeBranch) => {
        this.loadOfficeBranches();
      },
      error => {
        this.twister.error(error.message);
      }
    )
  }
}
