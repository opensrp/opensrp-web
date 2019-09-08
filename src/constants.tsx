import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { NavModuleObj } from './components/page/SideMenu/SideMenu';
import { NavCollapseObj, NavObj } from './components/page/SubMenu/SubMenu';

// internal urls
export const LOGIN_URL = '/login';
export type LOGIN_URL = typeof LOGIN_URL;
export const LOGOUT_URL = '/logout';
export type LOGOUT_URL = typeof LOGOUT_URL;
export const HOME_URL = '/';
export type HOME_URL = typeof HOME_URL;

export const CLIENT_URL = '/clients';
export type CLIENT_URL = typeof CLIENT_URL;
export const HOUSEHOLD_URL = '/404';
export type HOUSEHOLD_URL = typeof HOUSEHOLD_URL;
export const ANC_URL = '/404';
export type ANC_URL = typeof ANC_URL;
export const CHILD_URL = '/404';
export type CHILD_URL = typeof CHILD_URL;

export const USER_URL = '/404';
export type USER_URL = typeof USER_URL;
export const ROLE_URL = '/404';
export type ROLE_URL = typeof ROLE_URL;
export const TEAM_URL = '/404';
export type TEAM_URL = typeof TEAM_URL;
export const LOCATION_URL = '/404';
export type LOCATION_URL = typeof LOCATION_URL;

// side nav confs
// identifiers
export const CLIENT_COLLAPSE_NAVIGATION_IDENTIFIER = 'CLIENT';
export type CLIENT_COLLAPSE_NAVIGATION_IDENTIFIER = typeof CLIENT_COLLAPSE_NAVIGATION_IDENTIFIER;
export const REPORT_COLLAPSE_NAVIGATION_IDENTIFIER = 'REPORT';
export type REPORT_COLLAPSE_NAVIGATION_IDENTIFIER = typeof REPORT_COLLAPSE_NAVIGATION_IDENTIFIER;
export const ADMIN_COLLAPSE_NAVIGATION_IDENTIFIER = 'ADMIN';
export type ADMIN_COLLAPSE_NAVIGATION_IDENTIFIER = typeof ADMIN_COLLAPSE_NAVIGATION_IDENTIFIER;

// collapse labels
export const CLIENT_COLLAPSE_NAVIGATION_LABEL = 'Client Records';
export type CLIENT_COLLAPSE_NAVIGATION_LABEL = typeof CLIENT_COLLAPSE_NAVIGATION_LABEL;
export const REPORT_COLLAPSE_NAVIGATION_LABEL = 'Reports';
export type REPORT_COLLAPSE_NAVIGATION_LABEL = typeof REPORT_COLLAPSE_NAVIGATION_LABEL;
export const ADMIN_COLLAPSE_NAVIGATION_LABEL = 'Admin';
export type ADMIN_COLLAPSE_NAVIGATION_LABEL = typeof ADMIN_COLLAPSE_NAVIGATION_LABEL;

// icons
export const CLIENT_COLLAPSE_NAVIGATION_ICON: IconProp = ['far', 'user'];
export const REPORT_COLLAPSE_NAVIGATION_ICON: IconProp = ['fas', 'chart-line'];
export const ADMIN_COLLAPSE_NAVIGATION_ICON: IconProp = ['fas', 'cog'];

// nested labels
export const CLIENT_PAGE_NAVIGATION_LABEL = 'All Clients';
export type CLIENT_PAGE_NAVIGATION_LABEL = typeof CLIENT_PAGE_NAVIGATION_LABEL;
export const HOUSEHOLD_PAGE_NAVIGATION_LABEL = 'Household';
export type HOUSEHOLD_PAGE_NAVIGATION_LABEL = typeof HOUSEHOLD_PAGE_NAVIGATION_LABEL;
export const ANC_PAGE_NAVIGATION_LABEL = 'ANC';
export type ANC_PAGE_NAVIGATION_LABEL = typeof ANC_PAGE_NAVIGATION_LABEL;
export const CHILD_PAGE_NAVIGATION_LABEL = 'Child';
export type CHILD_PAGE_NAVIGATION_LABEL = typeof CHILD_PAGE_NAVIGATION_LABEL;

export const USER_PAGE_NAVIGATION_LABEL = 'Users';
export type USER_PAGE_NAVIGATION_LABEL = typeof USER_PAGE_NAVIGATION_LABEL;
export const ROLE_PAGE_NAVIGATION_LABEL = 'Roles';
export type ROLE_PAGE_NAVIGATION_LABEL = typeof ROLE_PAGE_NAVIGATION_LABEL;
export const TEAM_PAGE_NAVIGATION_LABEL = 'Teams';
export type TEAM_PAGE_NAVIGATION_LABEL = typeof TEAM_PAGE_NAVIGATION_LABEL;
export const LOCATION_PAGE_NAVIGATION_LABEL = 'Locations';
export type LOCATION_PAGE_NAVIGATION_LABEL = typeof LOCATION_PAGE_NAVIGATION_LABEL;

// nav objects
// client page
export const CLIENT_PAGE_NAVIGATION_OBJECT: NavObj = {
  navLabel: CLIENT_PAGE_NAVIGATION_LABEL,
  navURL: CLIENT_URL,
};
export const HOUSEHOLD_PAGE_NAVIGATION_OBJECT: NavObj = {
  navLabel: HOUSEHOLD_PAGE_NAVIGATION_LABEL,
  navURL: HOUSEHOLD_URL,
};
export const ANC_PAGE_NAVIGATION_OBJECT: NavObj = {
  navLabel: ANC_PAGE_NAVIGATION_LABEL,
  navURL: ANC_URL,
};
export const CHILD_PAGE_NAVIGATION_OBJECT: NavObj = {
  navLabel: CHILD_PAGE_NAVIGATION_LABEL,
  navURL: CHILD_URL,
};

export const USER_PAGE_NAVIGATION_OBJECT: NavObj = {
  navLabel: USER_PAGE_NAVIGATION_LABEL,
  navURL: USER_URL,
};
export const ROLE_PAGE_NAVIGATION_OBJECT: NavObj = {
  navLabel: ROLE_PAGE_NAVIGATION_LABEL,
  navURL: ROLE_URL,
};
export const TEAM_PAGE_NAVIGATION_OBJECT: NavObj = {
  navLabel: TEAM_PAGE_NAVIGATION_LABEL,
  navURL: TEAM_URL,
};
export const LOCATION_PAGE_NAVIGATION_OBJECT: NavObj = {
  navLabel: LOCATION_PAGE_NAVIGATION_LABEL,
  navURL: LOCATION_URL,
};

// collapse nav object
// client
export const CLIENT_COLLAPSE_NAVIGATION_OBJECT: NavCollapseObj = {
  navIcon: CLIENT_COLLAPSE_NAVIGATION_ICON,
  navLabel: CLIENT_COLLAPSE_NAVIGATION_LABEL,
};
export const REPORT_COLLAPSE_NAVIGATION_OBJECT: NavCollapseObj = {
  navIcon: REPORT_COLLAPSE_NAVIGATION_ICON,
  navLabel: REPORT_COLLAPSE_NAVIGATION_LABEL,
};
export const ADMIN_COLLAPSE_NAVIGATION_OBJECT: NavCollapseObj = {
  navIcon: ADMIN_COLLAPSE_NAVIGATION_ICON,
  navLabel: ADMIN_COLLAPSE_NAVIGATION_LABEL,
};

// nav module objects
export const CLIENT_NAVIGATION_MODULE_OBJECT: NavModuleObj = {
  childNavs: [
    CLIENT_PAGE_NAVIGATION_OBJECT,
    HOUSEHOLD_PAGE_NAVIGATION_OBJECT,
    ANC_PAGE_NAVIGATION_OBJECT,
    CHILD_PAGE_NAVIGATION_OBJECT,
  ],
  identifier: CLIENT_COLLAPSE_NAVIGATION_IDENTIFIER,
  parentNav: CLIENT_COLLAPSE_NAVIGATION_OBJECT,
};
export const REPORT_NAVIGATION_MODULE_OBJECT: NavModuleObj = {
  childNavs: [],
  identifier: REPORT_COLLAPSE_NAVIGATION_IDENTIFIER,
  parentNav: REPORT_COLLAPSE_NAVIGATION_OBJECT,
};
export const ADMIN_NAVIGATION_MODULE_OBJECT: NavModuleObj = {
  childNavs: [
    USER_PAGE_NAVIGATION_OBJECT,
    ROLE_PAGE_NAVIGATION_OBJECT,
    TEAM_PAGE_NAVIGATION_OBJECT,
    LOCATION_PAGE_NAVIGATION_OBJECT,
  ],
  identifier: ADMIN_COLLAPSE_NAVIGATION_IDENTIFIER,
  parentNav: ADMIN_COLLAPSE_NAVIGATION_OBJECT,
};
