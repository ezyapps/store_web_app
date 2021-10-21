import { INavData } from '@coreui/angular';
export const quarantineNavItems: INavData[] = [
  {
    title: true,
    name: 'কোয়ারান্টিন ব্যবস্থাপনা'
  },
  {
    name: 'নতুন ইমিগ্র্যান্ট',
    url: '/quarantine/new-immigrant',
    icon: 'icon-plus'
  },
  {
    name: 'ইমিগ্র্যান্ট তালিকা',
    url: '/quarantine/immig-list',
    icon: 'icon-list'
  },
  {
    name: 'ইমিগ্র্যান্ট বিস্তারিত',
    url: '/civil-suite/casedetails',
    icon: 'icon-list'
  },
  {
    name: 'নমুনা সংগ্রহ',
    url: '/quarantine/samplecollection',
    icon: 'icon-list'
  },
  {
    name: 'কোয়ারান্টিন সেন্টার',
    url: '/quarantine/centerlist',
    icon: 'icon-list'
  },
];

