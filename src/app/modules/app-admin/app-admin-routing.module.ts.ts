import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppAdminComponent } from './app-admin.component';
import { OfficeAppsComponent } from './components/app-rights/office-apps/office-apps.component';
import { RightGroupListComponent } from './components/app-rights/right-group/right-group-list/right-group-list.component';
import { RightsComponent } from './components/app-rights/rights/rights.component';
import { MinistryComponent } from './components/office-organogram/ministry/ministry.component';
import { OfficeBranchComponent } from './components/office-organogram/office-branch/office-branch.component';
import { OfficeLevelComponent } from './components/office-organogram/office-level/office-level.component';
import { OfficeStructureRightComponent } from './components/office-organogram/office-structure-right/office-structure-right.component';
import { OfficeStructureComponent } from './components/office-organogram/office-structure/office-structure.component';
import { OfficeComponent } from './components/office-organogram/office/office.component';
import { RoleListComponent } from './components/roles/role-list/role-list.component';
import { RoleNewComponent } from './components/roles/role-new/role-new.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    data: {
      title: 'অ্যাপ অ্যাডমিন'
    },
    children: [
      {
        path: 'dashboard',
        component: AppAdminComponent,
        data: {
          title: 'ড্যাশবোর্ড'
        }
      },
      {
        path: 'ministries',
        component: MinistryComponent,
        data: {
          title: 'মন্ত্রণালয়'
        }
      },
      {
        path: 'office-levels',
        component: OfficeLevelComponent,
        data: {
          title: 'অফিস স্তর সমূহ'
        }
      },
      {
        path: 'offices',
        component: OfficeComponent,
        data: {
          title: 'অফিস সমূহ'
        }
      },
      {
        path: 'office-branches',
        component: OfficeBranchComponent,
        data: {
          title: 'অফিসের শাখা সমূহ'
        }
      },
      {
        path: 'office-structure',
        component: OfficeStructureComponent,
        data: {
          title: 'অফিস কাঠামো'
        }
      },
      {
        path: 'office-structure-right',
        component: OfficeStructureRightComponent,
        data: {
          title: 'পদবী ভিত্তিক রাইটস'
        }
      },
      {
        path: 'office-apps',
        component: OfficeAppsComponent,
        data: {
          title: 'অফিস মডিউলস'
        }
      },
      {
        path: 'right-groups',
        component: RightGroupListComponent,
        data: {
          title: 'রাইট গ্রুপ'
        }
      },
      {
        path: 'rights',
        component: RightsComponent,
        data: {
          title: 'অ্যাপ রাইট সমূহ'
        }
      },
      {
        path: 'roles',
        data: {
          title: 'পদ সমূহ'
        },
        children: [
          {
            path: '',
            component: RoleListComponent,
            data: {
              title: 'পদের তালিকা'
            }
          },
          {
            path: 'new',
            component: RoleNewComponent,
            data: {
              title: 'নতুন পদ'
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppAdminRoutingModule {
}
