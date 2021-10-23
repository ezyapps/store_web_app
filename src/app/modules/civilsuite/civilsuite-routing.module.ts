import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppealCaseEntryComponent } from './components/appeal-case-entry/appeal-case-entry.component';
import { AppealCaseListComponent } from './components/appeal-case-list/appeal-case-list.component';
import { CaseDetailsComponent } from './components/case-details/case-details.component';
import { CaseListByHearingdateComponent } from './components/case-list-by-hearingdate/case-list-by-hearingdate.component';
import { CaseListComponent } from './components/case-list/case-list.component';
import { CaseNotificationStatusComponent } from './components/case-notification-status/case-notification-status.component';
import { CivilsuiteDashboardComponent } from './components/civilsuite-dashboard/civilsuite-dashboard.component';
import { LostCasesComponent } from './components/lost-cases/lost-cases.component';
import { NewCaseComponent } from './components/new-case/new-case.component';
import { CaseDetailsResolver } from './resolvers/case-details.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    data: {
      title: 'দেওয়ানি মামলা'
    },
    children: [
      {
        path: 'dashboard',
        component: CivilsuiteDashboardComponent,
        data: {
          title: 'ড্যাশবোর্ড'
        }
      },
      {
        path: 'new-case',
        component: NewCaseComponent,
        data: {
          title: 'নতুন মামলা'
        }
      },
      {
        path: 'hearingcaselist',
        component: CaseListByHearingdateComponent,
        data:{
          title: 'শুনানী মামলার তালিকা'
        }
      },
      {
        path: 'caselist',
        component: CaseListComponent,
        data: {
          title: 'মামলার তালিকা'
        }
      },
      {
        path: 'caselist/:distCode/:upzCode/:status',
        component: CaseListComponent,
        data: {
          title: 'মামলার তালিকা'
        }
      },
      {
        path: 'appealcaselist',
        component: AppealCaseListComponent,
        data: {
          title: 'আপীল মামলার তালিকা'
        }
      },
      {
        path: 'casedetails',
        component: CaseDetailsComponent,
        data: {
          title: 'মামলার বিস্তারিত'
        }
      },
      {
        path: 'casedetails/:caseNo',
        component: CaseDetailsComponent,
        resolve: {caseDetails: CaseDetailsResolver},
        data: {
          title: 'মামলার বিস্তারিত'
        }
      },
      {
        path: 'appeal-case-entry/:caseNo',
        component: AppealCaseEntryComponent,
        resolve: {caseDetails: CaseDetailsResolver},
        data: {
          title: 'আপিল মামলা দায়ের'
        }
      },
      {
        path: 'lostcases',
        component: LostCasesComponent,
        data: {
          title: 'পরাজিত মামলার তালিকা'
        }
      },
      {
        path: 'notifications',
        component: CaseNotificationStatusComponent,
        data: {
          title: 'অবহিত করনের অবস্থা'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CivilSuiteRoutingModule {}
