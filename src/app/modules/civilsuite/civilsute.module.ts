import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { CivilSuiteRoutingModule } from './civilsuite-routing.module';
import {FieldsetModule} from 'primeng/fieldset';
import { CivilsuiteDashboardComponent } from './components/civilsuite-dashboard/civilsuite-dashboard.component';
import { NewCaseComponent } from './components/new-case/new-case.component';
import { CommonModule, DatePipe } from '@angular/common';
import { CaseListComponent } from './components/case-list/case-list.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { CaseDetailsComponent } from './components/case-details/case-details.component';
import { CaseDetailsResolver } from './resolvers/case-details.resolver';
import { CaseProgressComponent } from './components/case-progress/case-progress.component';
import { CaseProgressPopupComponent } from './components/case-progress-popup/case-progress-popup.component';
import { LostCasesComponent } from './components/lost-cases/lost-cases.component';
import { AppealCaseEntryComponent } from './components/appeal-case-entry/appeal-case-entry.component';
import { AppealCaseListComponent } from './components/appeal-case-list/appeal-case-list.component';
import { CaseHearingdatesPopupComponent } from './components/case-hearingdates-popup/case-hearingdates-popup.component';
import { CaseHearingDateUpdateComponent } from './components/case-hearing-date-update/case-hearing-date-update.component';
import { CaseHearingDateListComponent } from './components/case-hearing-date-list/case-hearing-date-list.component';
import { AppealCaseResultUpdateComponent } from './components/appeal-case-result-update/appeal-case-result-update.component';
import { CaseListByHearingdateComponent } from './components/case-list-by-hearingdate/case-list-by-hearingdate.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatTabsModule, MatTooltipModule } from '@angular/material';
import { CountToModule } from 'angular-count-to';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ChartsModule } from 'ng2-charts';
import { CaseNotificationStatusComponent } from './components/case-notification-status/case-notification-status.component';

@NgModule({
  imports: [
    CommonModule,
    CivilSuiteRoutingModule,
    FormsModule,
    ButtonModule,
    TableModule,
    TabsModule,
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
    MatTableExporterModule,
    ChartsModule
  ],
  declarations: [
    CivilsuiteDashboardComponent,
    NewCaseComponent,
    CaseListComponent,
    CaseDetailsComponent,
    CaseProgressComponent,
    CaseProgressPopupComponent,
    LostCasesComponent,
    AppealCaseEntryComponent,
    AppealCaseListComponent,
    CaseHearingdatesPopupComponent,
    CaseHearingDateUpdateComponent,
    CaseHearingDateListComponent,
    AppealCaseResultUpdateComponent,
    CaseListByHearingdateComponent,
    CaseNotificationStatusComponent
  ],
  providers: [
    CaseDetailsResolver,
    DatePipe
  ]
})
export class CivilSuiteModule {}
