import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppAdminComponent } from './app-admin.component';
import { AppAdminRoutingModule } from './app-admin-routing.module.ts';
import { FormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {FieldsetModule} from 'primeng/fieldset';
import { RoleEditComponent } from './components/roles/role-edit/role-edit.component';
import { RoleListComponent } from './components/roles/role-list/role-list.component';
import { RoleNewComponent } from './components/roles/role-new/role-new.component';
import { RightGroupListComponent } from './components/app-rights/right-group/right-group-list/right-group-list.component';
import { RightsComponent } from './components/app-rights/rights/rights.component';
import { OfficeLevelComponent } from './components/office-organogram/office-level/office-level.component';
import { MinistryComponent } from './components/office-organogram/ministry/ministry.component';
import { OfficeComponent } from './components/office-organogram/office/office.component';
import { OfficeBranchComponent } from './components/office-organogram/office-branch/office-branch.component';
import { OfficeStructureComponent } from './components/office-organogram/office-structure/office-structure.component';
import { OfficeAppsComponent } from './components/app-rights/office-apps/office-apps.component';
import { RoleRightsComponent } from './components/role-rights/role-rights.component';
import { OfficeStructureRightComponent } from './components/office-organogram/office-structure-right/office-structure-right.component';

@NgModule({
  imports: [
    CommonModule,
    AppAdminRoutingModule,
    FormsModule,
    ButtonModule,
    TableModule,
    FieldsetModule
  ],
  declarations: [
    AppAdminComponent,
    RoleListComponent,
    RoleEditComponent,
    RoleNewComponent,
    RightGroupListComponent,
    RightsComponent,
    MinistryComponent,
    OfficeLevelComponent,
    OfficeComponent,
    OfficeBranchComponent,
    OfficeStructureComponent,
    OfficeAppsComponent,
    RoleRightsComponent,
    OfficeStructureRightComponent
  ]
})
export class AppAdminModule { }
