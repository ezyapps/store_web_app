import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../../../../common/_services/alertify.service';
import { Application } from '../../../models/application.model';
import { GovtOffice } from '../../../models/govt-office.model';
import { Ministry } from '../../../models/ministry.model';
import { OfficeLevel } from '../../../models/office-level.model';
import { ApplicationService } from '../../../services/application.service';
import { GovtOfficeService } from '../../../services/govt-office.service';
import { MinistryService } from '../../../services/ministry.service';
import { OfficeApplicationService } from '../../../services/office-application.service';
import { OfficeLevelService } from '../../../services/office-level.service';

@Component({
  selector: 'app-office-apps',
  templateUrl: './office-apps.component.html',
  styleUrls: ['./office-apps.component.scss']
})
export class OfficeAppsComponent implements OnInit {

  model: any = {};
  ministries: Ministry[];
  officeLevels: OfficeLevel[];
  offices: GovtOffice[];
  applications: Application[];
  officeApps: any[];

  constructor(
    private ministryService: MinistryService,
    private officeLevelService:  OfficeLevelService,
    private officeService:  GovtOfficeService,
    private twister: AlertifyService,
    private applicationService: ApplicationService,
    private officeAppsService: OfficeApplicationService
  ) { }

  ngOnInit() {
    this.loadMinistries();
    this.loadApplications();
    this.loadOfficeApplications();
  }

  loadMinistries() {
    this.ministryService.findAll().subscribe(
      (data: Ministry[]) => {
        this.ministries = data;
      },
      error => {
        this.twister.error(error.message);
      }
    );
  }

  loadOffices() {
    this.officeService.getOfficeList().subscribe ( // getAllByMinistryOfficeLevel
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
    );
  }

  setNewOfficeApps() {
    console.log(this.model);
    this.officeAppsService.save(this.model).subscribe(
      (data: any) => {
        this.loadOfficeApplications();
      },
      error => {
        this.twister.error(error.message);
      }
    );
  }

  loadApplications() {
    this.applicationService.findAll().subscribe(
      (data: Application[]) => {
        this.applications = data;
        console.log(data);
      }, error => {
        this.twister.error(error.message);
      }
    );
  }

  loadOfficeApplications() {
    this.officeAppsService.getAppsByOfficeId(this.model.officeId).subscribe(
      (data: any[]) => {
        this.officeApps = data;
        console.log(data);
      }, error => {
        this.twister.error(error.message);
      }
    );
  }

}
