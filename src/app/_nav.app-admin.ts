import { INavData } from '@coreui/angular';

export const appAdminNavItems: INavData[] = [
  {
    title: true,
    name: 'অ্যাপ সেটিংস'
  },
  {
    name: 'ভৌগলিক অবস্থান',
    url: '/GEOLocation',
    icon: 'icon-settings',
    children: [
      {
        name: 'বিভাগ সমূহ',
        url: '/geo-loc/divisions',
        icon: 'icon-map'
      },
      {
        name: 'জেলা সমূহ',
        url: '/geo-loc/districts',
        icon: 'icon-map'
      },
      {
        name: 'উপজেলা সমূহ',
        url: '/geo-loc/upazilas',
        icon: 'icon-map'
      },
      {
        name: 'ইউনিয়ন সমূহ',
        url: '/geo-loc/unions',
        icon: 'icon-map'
      },
      {
        name: 'মৌজা সমূহ',
        url: '/geo-loc/mouzas',
        icon: 'icon-map'
      }
    ]
  },
  {
    name: 'অফিস সেটআপ',
    url: '/OfficeSetup',
    icon: 'icon-settings',
    children: [
      {
        name: 'মন্ত্রণালয়',
        url: '/app-admin/ministries',
        icon: 'icon-settings'
      },
      {
        name: 'অফিস স্তর',
        url: '/app-admin/office-levels',
        icon: 'icon-settings'
      },
      {
        name: 'অফিস সমূহ',
        url: '/app-admin/offices',
        icon: 'icon-settings'
      },
      {
        name: 'অফিসের শাখা সমূহ',
        url: '/app-admin/office-branches',
        icon: 'icon-settings'
      },
      {
        name: 'অফিস কাঠামো',
        url: '/app-admin/office-structure',
        icon: 'icon-settings'
      },
      {
        name: 'পদবী ভিত্তিক রাইটস',
        url: '/app-admin/office-structure-right',
        icon: 'icon-settings'
      }
    ]
  },
  {
    name: 'প্রবেশাধিকার নিয়ন্ত্রণ',
    url: '/AppRoleRights',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'অফিস অ্যাপস',
        url: '/app-admin/office-apps',
        icon: 'icon-settings'
      },
      {
        name: 'রাইটস',
        url: '/app-admin/rights',
        icon: 'icon-settings'
      },
      {
        name: 'রাইটস গ্রুপ',
        url: '/app-admin/right-groups',
        icon: 'icon-settings'
      },
      {
        name: 'দায়িত্ব সমূহ',
        url: '/app-admin/roles',
        icon: 'icon-settings'
      }
    ]
  }
];

