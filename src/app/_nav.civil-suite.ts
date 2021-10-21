import { INavData } from '@coreui/angular';

export function getCivilSuiteNavItems() {
  
}
export const civilSuiteNavItems: INavData[] = [
  {
    title: true,
    name: 'দেওয়ানি মামলা'
  },
  {
    name: 'নতুন মামলা',
    url: '/civil-suite/new-case',
    icon: 'icon-plus'
  },
  {
    name: 'শুনানী মামলার তালিকা',
    url: '/civil-suite/hearingcaselist',
    icon: 'icon-list'
  },
  {
    name: 'মামলার তালিকা',
    url: '/civil-suite/caselist',
    icon: 'icon-list'
  },
  {
    name: 'মামলা বিস্তারিত',
    url: '/civil-suite/casedetails',
    icon: 'icon-list'
  },
  {
    name: 'আপীল মামলার তালিকা',
    url: '/civil-suite/appealcaselist',
    icon: 'icon-list'
  },
  {
    name: 'পরাজিত মামলার তালিকা',
    url: '/civil-suite/lostcases',
    icon: 'icon-list'
  }
];

