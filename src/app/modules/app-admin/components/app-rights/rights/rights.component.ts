import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../../../../common/_services/alertify.service';
import { Application } from '../../../models/application.model';
import { RightGroup } from '../../../models/right-group.model';
import { Right } from '../../../models/right.model';
import { ApplicationService } from '../../../services/application.service';
import { RightGroupService } from '../../../services/right-group.service';
import { RightService } from '../../../services/right.service';

@Component({
  selector: 'app-rights',
  templateUrl: './rights.component.html',
  styleUrls: ['./rights.component.scss']
})
export class RightsComponent implements OnInit {

  model: any = {};
  applications: Application[];
  rightGroups: RightGroup[];
  rights: Right[];

  constructor(
    private twister: AlertifyService,
    private applicationService: ApplicationService,
    private rightGroupService: RightGroupService,
    private rightService: RightService
  ) { }

  ngOnInit() {
    this.loadApplications();
    this.loadRightGroups();
    this.loadRights();
  }
  loadRights() {
    this.rightService.getAll(this.model.rightGroupId).subscribe(
      (data: Right[]) => {
        this.rights = data;
      },
      error => {
        this.twister.error(error.message);
      }
    );
  }
  loadRightGroups() {
    this.rightGroupService.getAll(this.model.appCode).subscribe(
      (data: RightGroup[]) => {
        console.log(data);
        this.rightGroups = data;
      }, error => {
        this.twister.error(error.message);
      }
    );
  }

  loadApplications() {
    this.applicationService.findAll().subscribe(
      (data: Application[]) => {
        this.applications = data;
      }, error => {
        this.twister.error(error.message);
      }
    );
  }

  saveRight() {
    this.rightService.save(this.model).subscribe(
      (data: Right) => {
        this.loadRights();
        this.twister.success('The right has been added successfully.');
      },
      error => {
        this.twister.error(error.message);
      }
    )
  }
}
