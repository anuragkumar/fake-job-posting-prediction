import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  rtlTitle: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    rtlTitle: 'لوحة القيادة',
    icon: 'icon-chart-pie-36',
    class: ''
  },
  {
    path: '/notifications',
    title: 'Dataset',
    rtlTitle: 'إخطارات',
    icon: 'icon-bell-55',
    class: ''
  },
  {
    path: '/user',
    title: 'Predicted Dataset',
    rtlTitle: 'ملف تعريفي للمستخدم',
    icon: 'icon-single-02',
    class: ''
  },
  {
    path: '/tables',
    title: 'Data Distribution Analysis',
    rtlTitle: 'قائمة الجدول',
    icon: 'icon-puzzle-10',
    class: ''
  },
  {
    path: '/icons',
    title: 'Fraudulent data analysis',
    rtlTitle: 'الرموز',
    icon: 'icon-atom',
    class: ''
  },
  {
    path: '/typography',
    title: 'External EDAs',
    rtlTitle: 'طباعة',
    icon: 'icon-align-center',
    class: ''
  },
  {
    path: '/maps',
    title: 'Maps',
    rtlTitle: 'خرائط',
    icon: 'icon-pin',
    class: '',
  },
  // {
  //   path: '/rtl',
  //   title: 'RTL Support',
  //   rtlTitle: 'ار تي ال',
  //   icon: 'icon-world',
  //   class: ''
  // }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
