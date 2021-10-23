import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuarantineCenterListComponent } from './components/center/center-list/center-list.component';
import { NewQuarantineCenterComponent } from './components/center/new-center/new-center.component';
import { QuarantineDashboardComponent } from './components/dashboard/dashboard.component';
import { ImmigrantListComponent } from './components/immigrant/immigrant-list/immigrant-list.component';
import { NewImmigrantComponent } from './components/immigrant/new-immigrant/new-immigrant.component';
import { SampleCollectionComponent } from './components/immigrant/sample-collection/sample-collection.component';

//import { CaseDetailsResolver } from './resolvers/case-details.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    data: {
      title: 'কোয়ারান্টিন ব্যবস্থাপনা'
    },
    children: [
      {
        path: 'dashboard',
        component: QuarantineDashboardComponent,
        data: {
          title: 'ড্যাশবোর্ড'
        }
      },
      {
        path: 'new-immigrant',
        component: NewImmigrantComponent,
        data: {
          title: 'নতুন ইমিগ্র্যান্ট'
        }
      },
      {
        path: 'immig-list',
        component: ImmigrantListComponent,
        data: {
          title: 'ইমিগ্র্যান্ট তালিকা'
        }
      },
      {
        path: 'samplecollection',
        component: SampleCollectionComponent,
        data: {
          title: 'নমুনা সংগ্রহ'
        }
      },
      {
        path: 'new-center',
        component: NewQuarantineCenterComponent,
        data: {
          title: 'নতুন সেন্টার'
        }
      },
      {
        path: 'centerlist',
        component: QuarantineCenterListComponent,
        data:{
          title: 'সেন্টারের তালিকা'
        }
      },
      // {
      //   path: 'caselist',
      //   component: CaseListComponent,
      //   data: {
      //     title: 'মামলার তালিকা'
      //   }
      // },
      // {
      //   path: 'appealcaselist',
      //   component: AppealCaseListComponent,
      //   data: {
      //     title: 'আপীল মামলার তালিকা'
      //   }
      // },
      // {
      //   path: 'casedetails',
      //   component: CaseDetailsComponent,
      //   data: {
      //     title: 'মামলার বিস্তারিত'
      //   }
      // },
      // {
      //   path: 'casedetails/:caseNo',
      //   component: CaseDetailsComponent,
      //   resolve: {caseDetails: CaseDetailsResolver},
      //   data: {
      //     title: 'মামলার বিস্তারিত'
      //   }
      // },
      // {
      //   path: 'appeal-case-entry/:caseNo',
      //   component: AppealCaseEntryComponent,
      //   resolve: {caseDetails: CaseDetailsResolver},
      //   data: {
      //     title: 'আপিল মামলা দায়ের'
      //   }
      // },
      // {
      //   path: 'lostcases',
      //   component: LostCasesComponent,
      //   data: {
      //     title: 'পরাজিত মামলার তালিকা'
      //   }
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CivilSuiteRoutingModule {}
