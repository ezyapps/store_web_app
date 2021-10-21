import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AlertifyService } from '../../../../../common/_services/alertify.service';
import { GovtOfficeBranch } from '../../../models/govt-office-branch.model';
import { GovtOfficeStructure } from '../../../models/govt-office-structure.model';
import { GovtOffice } from '../../../models/govt-office.model';
import { Ministry } from '../../../models/ministry.model';
import { OfficeLevel } from '../../../models/office-level.model';
import { Role } from '../../../models/role.model';
import { GovtOfficeBranchService } from '../../../services/govt-office-branch.service';
import { GovtOfficeStructureService } from '../../../services/govt-office-structure.service';
import { GovtOfficeService } from '../../../services/govt-office.service';
import { MinistryService } from '../../../services/ministry.service';
import { OfficeLevelService } from '../../../services/office-level.service';
import { RoleService } from '../../../services/role.service';
import { OfficeStructureRightComponent } from '../office-structure-right/office-structure-right.component';

@Component({
  selector: 'app-office-structure',
  templateUrl: './office-structure.component.html',
  styleUrls: ['./office-structure.component.scss'],
  providers: [DialogService]
})
export class OfficeStructureComponent implements OnInit {
  model: any = {};
  ministries: Ministry[];
  officeLevels: OfficeLevel[];
  offices: GovtOffice[];
  officeBranches: GovtOfficeBranch[];
  officeStructures: GovtOfficeStructure[];
  roles: Role[];

  constructor(
    private ministryService: MinistryService,
    private officeLevelService:  OfficeLevelService,
    private officeService:  GovtOfficeService,
    private twister: AlertifyService,
    private officeBranchService: GovtOfficeBranchService,
    private officeStructureService: GovtOfficeStructureService,
    private roleService: RoleService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.loadMinistries();
  }

  // loadRightAccessWindow(structureModel) {
  //   const ref = this.dialogService.open
  //   (
  //     OfficeStructureRightComponent,
  //     {
  //       data: {
  //         structModel: structureModel
  //       },
  //       width: '70%',
  //       header: 'Access Rights',
  //     }
  //   );
  //   ref.onClose.subscribe(() => {
  //     //this.loadCases();
  //   });
  // }

  saveNewOfficeStructure() {
    this.officeStructureService.save(this.model).subscribe(
      () => {
        this.twister.success('New structure has been added.');
        this.loadOfficeStructures();
      },error => {
        this.twister.error(error.message);
      }
    )
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
  onOfficeLevelChange() {
    var geoLevel = this.officeLevels.find(x => x.id === this.model.officeLevelId).geoLevel;
    this.loadRoles(geoLevel);
    this.loadOffices();
  }

  loadRoles(geoLevel: number) {
    this.roleService.getAllByGeoLevelWithCommon(geoLevel).subscribe(
      (data: Role[]) => {
        this.roles = data;
      },error => {
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
        console.log(this.officeBranches);
      },
      error => {
        this.twister.error(error.message);
      }
    )
  }

  loadOfficeStructures() {
    this.officeStructureService.getAllByOfficeBranch(this.model.branchId).subscribe(
      (data: GovtOfficeStructure[]) => {
        this.officeStructures = data;
      },
      error => {
        this.twister.error(error.message);
      }
    )
  }
}
