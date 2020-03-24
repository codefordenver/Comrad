export const SidebarData = [
  {
    name: 'home',
    url: '/dashboard',
    iconClass: 'fas fa-home',
    tooltipText: 'Home',
  },
  {
    name: 'microphone',
    url: '/show-builder',
    iconClass: 'fas fa-microphone',
    tooltipText: 'Show Builder',
  },
  {
    name: 'traffic',
    url: '/traffic',
    iconClass: 'fas fa-car',
    tooltipText: 'Traffic',
    allowedRoles: ['Admin', 'Full Access', 'Underwriting'],
  },
  {
    name: 'calendar',
    url: '/calendar',
    iconClass: 'fas fa-calendar-alt',
    tooltipText: 'Show Calendar',
  },
  {
    name: 'library',
    url: '/library',
    iconClass: 'fas fa-music',
    tooltipText: 'Music Library',
  },
  {
    name: 'copy',
    url: '/resources',
    iconClass: 'fas fa-copy',
    tooltipText: 'Resources',
  },
  {
    name: 'report',
    url: '/reporting',
    iconClass: 'fas fa-chart-bar',
    tooltipText: 'Reporting',
    allowedRoles: ['Admin', 'Underwriting', 'Full Access'],
  },
  {
    name: 'user',
    url: '/user/search',
    iconClass: 'fas fa-user',
    tooltipText: 'Users',
    allowedRoles: ['Admin'],
  },
];
