import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../../../common/_services/alertify.service';
import { GovtOfficeBranch } from '../../../app-admin/models/govt-office-branch.model';
import { GovtOfficeStructure } from '../../../app-admin/models/govt-office-structure.model';
import { GovtOffice } from '../../../app-admin/models/govt-office.model';
import { Ministry } from '../../../app-admin/models/ministry.model';
import { OfficeLevel } from '../../../app-admin/models/office-level.model';
import { GovtOfficeBranchService } from '../../../app-admin/services/govt-office-branch.service';
import { GovtOfficeStructureService } from '../../../app-admin/services/govt-office-structure.service';
import { GovtOfficeService } from '../../../app-admin/services/govt-office.service';
import { MinistryService } from '../../../app-admin/services/ministry.service';
import { OfficeLevelService } from '../../../app-admin/services/office-level.service';
import { UserRoleService } from '../../services/user-role.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-employee-mgt',
  templateUrl: './employee-mgt.component.html',
  styleUrls: ['./employee-mgt.component.scss']
})
export class EmployeeMgtComponent implements OnInit {
  sModel: any = {};
  empModel: any = {};
  currentRoles: any[];
  ministries: Ministry[];
  officeLevels: OfficeLevel[];
  offices: GovtOffice[];
  officeBranches: GovtOfficeBranch[];
  officeStructures: GovtOfficeStructure[];
  model: any = {};
  constructor(
    private twister: AlertifyService,
    private userService: UserService,
    private userRoleService: UserRoleService,
    private ministryService: MinistryService,
    private officeLevelService:  OfficeLevelService,
    private officeService:  GovtOfficeService,
    private officeBranchService: GovtOfficeBranchService,
    private officeStructureService: GovtOfficeStructureService
  ) { }

  ngOnInit() {
    this.loadMinistries();
  }
  assignRoleToEmployee() {
    if(!this.empModel.id) {
      this.twister.message('Sorry! Employee not selected.');
    }else {
      this.twister.confirm('Confirmation','Are you sure?', () => {
        const userRoleModel =  {userId: this.empModel.id, officeStructureId: this.model.officeStructureId, roleType: this.model.roleType};
        this.userRoleService.assignRole(userRoleModel).subscribe(() => {
            this.twister.success('কর্মকর্তার নতুন পদবী সংযুক্ত হয়েছে।');
            this.model = {};
            this.loadEmpCurrentRoles(this.empModel.id);
          },
          error => {
            this.twister.error(error.message);
          }
        );
      }, ()=> {}
      );

    }

  }

  searchEmployee() {
    this.empModel = {};
    if(this.sModel.username) {
      this.userService.getByUserName(this.sModel.username).subscribe(
        (data: any) => {
          console.log(data);
          this.empModel = data;
          this.loadEmpCurrentRoles(this.empModel.id);
        },error => {
          this.twister.error(error.message);
        }
      );
    }else if(this.sModel.email) {
      this.userService.getByEmail(this.sModel.email).subscribe(
        (data: any) => {
          this.empModel = data;
          this.loadEmpCurrentRoles(this.empModel.id);
        },error => {
          this.twister.error(error.message);
        }
      );
    }else if(this.sModel.nid) {
      this.userService.getByNID(this.sModel.nid).subscribe(
        (data: any) => {
          this.empModel = data;
          this.loadEmpCurrentRoles(this.empModel.id);
        },error => {
          this.twister.error(error.message);
        }
      );
    }
  }

  loadEmpCurrentRoles(empId: string) {
    this.userRoleService.getAllByUser(empId).subscribe(
      (data: any) => {
        this.currentRoles = data;
      },error => {
        this.twister.error(error.message);
      }
    )
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
    // var geoLevel = this.officeLevels.find(x => x.id === this.model.officeLevelId).geoLevel;
    this.loadOffices();
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
    );
  }
  loadOfficeBranches() {
    this.officeBranchService.getAllByOffice(this.model.officeId).subscribe(
      (data: GovtOfficeBranch[]) => {
        this.officeBranches = data;
        console.log(this.officeBranches);
      },
      error => {
        this.twister.error(error.message);
      }
    );
  }

  loadOfficeStructures() {
    this.officeStructureService.getAllByOfficeBranch(this.model.branchId).subscribe(
      (data: GovtOfficeStructure[]) => {
        this.officeStructures = data;
      },
      error => {
        this.twister.error(error.message);
      }
    );
  }
}
