import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UserRouterModule } from './users-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { FormsModule } from '@angular/forms';
import { EmployeeMgtComponent } from './components/employee-mgt/employee-mgt.component';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ProfilePhotoUpdateComponent } from './components/profile/photo-update/photo-update.component';
import { ProfileSummeryComponent } from './components/profile/profile-summery/profile-summery.component';
import { ProfilePhotoListComponent } from './components/profile/photo-list/photo-list.component';
import { UserProfileInfoComponent } from './components/profile/profile-info/profile-info.component';
import { ProfileInfoEditComponent } from './components/profile/profile-info-edit/profile-info-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserRouterModule,
    FormsModule,
    ButtonModule,
    TableModule,
    TabsModule,
    FieldsetModule,
    TooltipModule.forRoot(),
    DropdownModule,
    ImageCropperModule
  ],
  declarations: [
    UsersComponent,
    ProfileComponent,
    RegisterComponent,
    EmployeeListComponent,
    EmployeeMgtComponent,
    ProfilePhotoUpdateComponent,
    ProfileSummeryComponent,
    ProfilePhotoListComponent,
    UserProfileInfoComponent,
    ProfileInfoEditComponent
  ]
})
export class UsersModule { }
