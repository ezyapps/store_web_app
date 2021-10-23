import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { CivilSuiteRoutingModule } from './quarantine-routing.module';
import {FieldsetModule} from 'primeng/fieldset';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatTabsModule, MatTooltipModule } from '@angular/material';
import { CountToModule } from 'angular-count-to';
import { MatTableExporterModule } from 'mat-table-exporter';
import { QuarantineDashboardComponent } from './components/dashboard/dashboard.component';
import { NewQuarantineCenterComponent } from './components/center/new-center/new-center.component';
import { QuarantineCenterListComponent } from './components/center/center-list/center-list.component';
import { NewImmigrantComponent } from './components/immigrant/new-immigrant/new-immigrant.component';
import { ImmigrantListComponent } from './components/immigrant/immigrant-list/immigrant-list.component';
import { QuarantineReferComponent } from './components/immigrant/quarantine-refer/quarantine-refer.component';
import { ImmigrantMoveComponent } from './components/immigrant/immigrant-move/immigrant-move.component';
import { ImmigrantMovementHistoryComponent } from './components/immigrant/immigrant-movement-history/immigrant-movement-history.component';
import { SampleCollectionComponent } from './components/immigrant/sample-collection/sample-collection.component';

@NgModule({
  imports: [
    CommonModule,
    CivilSuiteRoutingModule,
    FormsModule,
    ButtonModule,
    TableModule,
    TabsModule,
    DropdownModule,
    FieldsetModule,
    TooltipModule.forRoot(),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatTabsModule,
    MatMenuModule,
    MatIconModule,
    CountToModule,
    MatTableExporterModule
  ],
  declarations: [
    QuarantineDashboardComponent,
    NewQuarantineCenterComponent,
    QuarantineCenterListComponent,
    NewImmigrantComponent,
    ImmigrantListComponent,
    QuarantineReferComponent,
    ImmigrantMoveComponent,
    ImmigrantMovementHistoryComponent,
    SampleCollectionComponent
  ],
  providers: [
    // CaseDetailsResolver
  ]
})
export class QuarantineModule {}
