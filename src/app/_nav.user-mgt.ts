import { INavData } from '@coreui/angular';
export const userMgtNavItems: INavData[] = [
  {
    title: true,
    name: 'কর্মকর্তা ব্যবস্থাপনা'
  },
  {
    name: 'নতুন কর্মকর্তা',
    url: '/users/register',
    icon: 'icon-plus'
  },
  {
    name: 'কর্মকর্তা তালিকা',
    url: '/users/employee-list',
    icon: 'icon-list'
  },
  {
    name: 'কর্মকর্তা ব্যবস্থাপনা',
    url: '/users/employee-mgt',
    icon: 'icon-list'
  }
];

