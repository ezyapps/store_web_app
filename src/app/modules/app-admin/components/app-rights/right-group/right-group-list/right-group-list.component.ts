import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../../../../../common/_services/alertify.service';
import { Application } from '../../../../models/application.model';
import { RightGroup } from '../../../../models/right-group.model';
import { ApplicationService } from '../../../../services/application.service';
import { RightGroupService } from '../../../../services/right-group.service';

@Component({
  selector: 'app-right-group-list',
  templateUrl: './right-group-list.component.html',
  styleUrls: ['./right-group-list.component.scss']
})
export class RightGroupListComponent implements OnInit {
  model: any = {};
  applications: Application[];
  rightGroups: RightGroup[];
  constructor(
    private twister: AlertifyService,
    private applicationService: ApplicationService,
    private rightGroupService: RightGroupService
  ) { }

  ngOnInit() {
    this.loadApplications();
    this.loadRightGroups();
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

  saveRightGroup() {
    this.rightGroupService.save(this.model).subscribe(
      (data: RightGroup) =>  {
        this.rightGroups.push(data);
        this.twister.success('New item has been added successfully');
      },
      error => {
        this.twister.error(error.message);
      }
    );
  }
}
