import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AlertifyService } from '../../../../../common/_services/alertify.service';
import { Application } from '../../../models/application.model';
import { GovtOfficeBranch } from '../../../models/govt-office-branch.model';
import { GovtOfficeStructureRight } from '../../../models/govt-office-structure-right.model';
import { GovtOfficeStructure } from '../../../models/govt-office-structure.model';
import { GovtOffice } from '../../../models/govt-office.model';
import { Ministry } from '../../../models/ministry.model';
import { OfficeLevel } from '../../../models/office-level.model';
import { RightGroup } from '../../../models/right-group.model';
import { Right } from '../../../models/right.model';
import { Role } from '../../../models/role.model';
import { ApplicationService } from '../../../services/application.service';
import { GovtOfficeBranchService } from '../../../services/govt-office-branch.service';
import { GovtOfficeStructureRightService } from '../../../services/govt-office-structure-right.service';
import { GovtOfficeStructureService } from '../../../services/govt-office-structure.service';
import { GovtOfficeService } from '../../../services/govt-office.service';
import { MinistryService } from '../../../services/ministry.service';
import { OfficeLevelService } from '../../../services/office-level.service';
import { RightGroupService } from '../../../services/right-group.service';
import { RightService } from '../../../services/right.service';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-office-structure-right',
  templateUrl: './office-structure-right.component.html',
  styleUrls: ['./office-structure-right.component.scss']
})
export class OfficeStructureRightComponent implements OnInit {
  officeStructure: GovtOfficeStructure;
  assignedRights: GovtOfficeStructureRight[];
  model: any = {};
  applications: Application[];
  rightGroups: RightGroup[];
  rights: Right[];
  officeStructures: GovtOfficeStructure[];
  ministries: Ministry[];
  officeLevels: OfficeLevel[];
  offices: GovtOffice[];
  officeBranches: GovtOfficeBranch[];
  structureId: string;

  constructor(
    private ministryService: MinistryService,
    private officeLevelService:  OfficeLevelService,
    private officeService:  GovtOfficeService,
    private twister: AlertifyService,
    private officeBranchService: GovtOfficeBranchService,
    private officeStructureService: GovtOfficeStructureService,
    private structRightService: GovtOfficeStructureRightService,
    private rightService: RightService,
    private applicationService: ApplicationService,
    private rightGroupService: RightGroupService,
    // public ref?: DynamicDialogRef,
    // public config?: DynamicDialogConfig
  ) { }

  ngOnInit() {
    // if(this.config?.data?.structModel){
    //   this.officeStructure = this.config.data.structModel;
    //   this.loadAccessRights();
    // }
    this.loadMinistries();
    this.loadApplications();
    this.loadRightGroups();
  }

  loadOfficeStructures() {
    this.officeStructureService.getAllByOfficeBranch(this.model.branchId).subscribe (
      (data: GovtOfficeStructure[]) => {
        this.officeStructures = data;
      },
      error => {
        this.twister.error(error.message);
      }
    );
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

  onOfficeLevelChange() {
    const geoLevel = this.officeLevels.find(x => x.id === this.model.officeLevelId).geoLevel;
    this.loadOffices();
  }

  loadOffices() {
    this.officeService.getOfficeList().subscribe ( // getAllByMinistryOfficeLevel (this.model.officeLevelId)
      (data: GovtOffice[]) => {
        this.offices = data;
      }, error => {
        this.twister.error(error.message);
      }
    );
  }

  loadOfficeLevels() {
    this.officeLevelService.getAll(this.model.ministryId).subscribe (
      (data: OfficeLevel[]) => {
        this.officeLevels = data;
      },
      error => {
        this.twister.error(error.message);
      }
    );
  }

  loadOfficeBranches() {
    this.officeBranchService.getAllByOffice(this.model.officeId).subscribe (
      (data: GovtOfficeBranch[]) => {
        this.officeBranches = data;
        console.log(this.officeBranches);
      },
      error => {
        this.twister.error(error.message);
      }
    );
  }

  loadOfficeStructure(structureId: string) {
    this.officeStructureService.findOne(structureId).subscribe(
      (data: any) => {
        this.officeStructure = data;
      }, error => {
        this.twister.error('Sorry! Failed to load data.');
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

  loadAccessRights() {
    console.log(this.structureId);
    this.structRightService.getAllByOfficeStructureId(this.structureId).subscribe(
      (data: any) => {
        this.assignedRights = data;
      }, error => {
        this.twister.error('Sorry! Problem while fetching data from server.');
      }
    );
  }

  CheckNotExists(rightId) {
    return this.assignedRights.find( a => a.rightId === rightId) === undefined;
  }

  saveRight(rightId) {
    const postModel = {
      OfficeStructureId: this.structureId,
      RightId: rightId
    };
    console.log(postModel);
    this.structRightService.createNew(postModel).subscribe(
      (data: any) => {
        this.loadAccessRights();
        this.twister.success('The Right has been added successfully');
      }, error => {
        this.twister.error('Sorry! Failed to save data. Please try again. Error: ' + error.message);
      }
    );
    // console.log(rightId);
    // this.ref.close();
  }
}
