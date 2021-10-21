import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeoLocationComponent } from './geo-location.component';
import { DivisionListComponent } from './components/division/division-list/division-list.component';
import { DivisionNewComponent } from './components/division/division-new/division-new.component';
import { GeoLocaionRoutingModule } from './geo-location.routing.module';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { TableModule } from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import { DistrictListComponent } from './components/district/district-list/district-list.component';
import { DistrictNewComponent } from './components/district/district-new/district-new.component';
import { UpazilaComponent } from './components/upazila/upazila.component';
import { UnionComponent } from './components/union/union.component';
import { MouzaComponent } from './components/mouza/mouza.component';

@NgModule({
  imports: [
    CommonModule,
    GeoLocaionRoutingModule,
    FormsModule,
    ButtonModule,
    TableModule,
    FieldsetModule,
    DropdownModule
  ],
  declarations: [
    GeoLocationComponent,
    DivisionListComponent,
    DivisionNewComponent,
    DistrictListComponent,
    DistrictNewComponent,
    UpazilaComponent,
    UnionComponent,
    MouzaComponent
  ],
  entryComponents: [
    DivisionNewComponent,
    DistrictNewComponent
  ]
})
export class GeoLocationModule { }
