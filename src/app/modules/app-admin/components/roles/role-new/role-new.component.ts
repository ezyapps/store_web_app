import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';
import { AlertifyService } from '../../../../../common/_services/alertify.service';
import { Role } from '../../../models/role.model';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-role-new',
  templateUrl: './role-new.component.html',
  styleUrls: ['./role-new.component.scss']
})
export class RoleNewComponent implements OnInit {
  model: any = {};
  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private roleService: RoleService,
    private alertify: AlertifyService
    ) { }

  ngOnInit() {
    this.model.roleName = '';
  }

  saveRole() {
    if (this.model != null) {
      console.log(this.model);
      this.model.geoLevel = +this.model.geoLevel;
      console.log(this.model);
      this.roleService.saveRole(this.model).subscribe((role: Role) => {
          this.ref.close(role);
        },
        err => {
          this.alertify.error(err.message);
        }
      );
    }

  }
}
