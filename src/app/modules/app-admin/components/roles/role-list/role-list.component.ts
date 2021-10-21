import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../../../../common/_services/alertify.service';
import {DialogService} from 'primeng/dynamicdialog';
import { RoleNewComponent } from '../role-new/role-new.component';
import { Role } from '../../../models/role.model';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.less'],
  providers: [DialogService]
})
export class RoleListComponent implements OnInit {
  roles: Role[] = [];
  viewRoles: Role[] = [];
  geoLevel: number = 0;
  constructor(
    private roleService: RoleService,
    private alertify: AlertifyService,
    private dialogService: DialogService) { }

  ngOnInit() {
    this.loadRoles();
  }
  elaborateGeoLevel(geoLevel){
    switch(geoLevel) {
      case "0": return 'সর্বজনীন স্তর';
      case "1": return 'কেন্দ্রীয়';
      case "2": return 'বিভাগীয়';
      case "3": return 'জেলা ভিত্তিক';
      case "4": return 'উপজেলা ভিত্তিক';
      case "5": return 'ইউনিয়ন ভিত্তিক';
    }
  }
  openNewRoleWindow() {
    const ref = this.dialogService.open(RoleNewComponent, {
        header: 'নতুন রোল',
        width: '50%'
    });
    ref.onClose.subscribe((role: Role) => {
      if (role !== null) {
        this.alertify.message('The role has been created');
        this.loadRoles();
      }
    });
  }
  onGeoLevelChange(){
    this.viewRoles = this.roles.filter(x => x.geoLevel == this.geoLevel);
    console.log(this.geoLevel);
    console.log(this.viewRoles);
  }
  loadRoles() {
    this.roleService.getAll().subscribe((data: Role[]) => {
      this.roles = data;
      this.viewRoles = data.filter(x => x.geoLevel == this.geoLevel);
    },
    error => {
      this.alertify.error(error);
    });
  }
}
