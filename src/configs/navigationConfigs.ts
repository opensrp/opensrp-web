import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { SideMenuProps } from '../components/page/SideMenu';
import {
  ModulePageLink,
  NavigationModule,
  PageLink,
  SubMenuProps,
} from '../components/page/SideMenu/SubMenu';
import {
  ADMIN,
  ALL_CLIENTS,
  ANC,
  ANC_URL,
  CHILD,
  CHILD_URL,
  CLIENT_RECORDS,
  CLIENT_URL,
  HOUSEHOLD,
  HOUSEHOLD_URL,
  LOCATIONS,
  LOCATIONS_URL,
  REPORTS,
  REPORTS_URL,
  ROLE_URL,
  ROLES,
  TEAM_URL,
  TEAMS,
  USER_URL,
  USERS,
} from '../constants';
import {
  ENABLE_ANC_PAGE,
  ENABLE_CHILD_PAGE,
  ENABLE_CLIENT_PAGE,
  ENABLE_HOUSEHOLD_PAGE,
  ENABLE_LOCATION_PAGE,
  ENABLE_REPORT_MODULE,
  ENABLE_ROLE_PAGE,
  ENABLE_TEAM_PAGE,
  ENABLE_USER_PAGE,
} from './env';

// Page links

export const CLIENT_PAGE_NAVIGATION: PageLink = {
  label: ALL_CLIENTS,
  url: CLIENT_URL,
};
export const HOUSEHOLD_PAGE_NAVIGATION: PageLink = {
  label: HOUSEHOLD,
  url: HOUSEHOLD_URL,
};
export const ANC_PAGE_NAVIGATION: PageLink = {
  label: ANC,
  url: ANC_URL,
};
export const CHILD_PAGE_NAVIGATION: PageLink = {
  label: CHILD,
  url: CHILD_URL,
};

export const USERS_PAGE_NAVIGATION: PageLink = {
  label: USERS,
  url: USER_URL,
};
export const ROLES_PAGE_NAVIGATION: PageLink = {
  label: ROLES,
  url: ROLE_URL,
};
export const TEAMS_PAGE_NAVIGATION: PageLink = {
  label: TEAMS,
  url: TEAM_URL,
};
export const LOCATIONS_PAGE_NAVIGATION: PageLink = {
  label: LOCATIONS,
  url: LOCATIONS_URL,
};

// icons
export const clientModuleNavIcon: IconProp = ['far', 'user'];
export const reportModuleNavIcon: IconProp = ['fas', 'chart-line'];
export const adminModuleNavIcon: IconProp = ['fas', 'cog'];

// Navigation links for navigation module. collapses when clicked to display the pageLinks

export const CLIENT_MODULE_PARENT_NAV: ModulePageLink = {
  icon: clientModuleNavIcon,
  label: CLIENT_RECORDS,
};
export const REPORT_MODULE_PARENT_NAV: ModulePageLink = {
  icon: reportModuleNavIcon,
  label: REPORTS,
  url: REPORTS_URL,
};
export const ADMIN_MODULE_PARENT_NAV: ModulePageLink = {
  icon: adminModuleNavIcon,
  label: ADMIN,
};

// nav module objects
export const CLIENT_NAVIGATION_MODULE: NavigationModule = {
  childNavs: [
    ENABLE_CLIENT_PAGE && CLIENT_PAGE_NAVIGATION,
    ENABLE_HOUSEHOLD_PAGE && HOUSEHOLD_PAGE_NAVIGATION,
    ENABLE_ANC_PAGE && ANC_PAGE_NAVIGATION,
    ENABLE_CHILD_PAGE && CHILD_PAGE_NAVIGATION,
  ].filter((childNav): childNav is PageLink => typeof childNav !== 'boolean'),
  parentNav: CLIENT_MODULE_PARENT_NAV,
};
export const REPORT_NAVIGATION_MODULE: NavigationModule = {
  childNavs: [],
  parentNav: REPORT_MODULE_PARENT_NAV,
};
export const ADMIN_NAVIGATION_MODULE: NavigationModule = {
  childNavs: [
    ENABLE_USER_PAGE && USERS_PAGE_NAVIGATION,
    ENABLE_ROLE_PAGE && ROLES_PAGE_NAVIGATION,
    ENABLE_TEAM_PAGE && TEAMS_PAGE_NAVIGATION,
    ENABLE_LOCATION_PAGE && LOCATIONS_PAGE_NAVIGATION,
  ].filter<PageLink>(
    (childNav: PageLink | boolean): childNav is PageLink => typeof childNav !== 'boolean'
  ),
  parentNav: ADMIN_MODULE_PARENT_NAV,
};

/** Enable Clients Module from its child pages */
export const ENABLE_CLIENT_RECORDS_MODULE =
  ENABLE_ANC_PAGE || ENABLE_CLIENT_PAGE || ENABLE_HOUSEHOLD_PAGE || ENABLE_HOUSEHOLD_PAGE;
export type ENABLE_CLIENT_RECORDS_MODULE = typeof ENABLE_CLIENT_RECORDS_MODULE;

/** Enable Admin Module from its child pages */
export const ENABLE_ADMIN_MODULE =
  ENABLE_USER_PAGE || ENABLE_ROLE_PAGE || ENABLE_TEAM_PAGE || ENABLE_LOCATION_PAGE;
export type ENABLE_ADMIN_MODULE = typeof ENABLE_ADMIN_MODULE;

export const sideMenuProps: SideMenuProps = {
  navigationModules: [
    {
      enabled: ENABLE_CLIENT_RECORDS_MODULE,
      module: CLIENT_NAVIGATION_MODULE,
    },
    {
      enabled: ENABLE_REPORT_MODULE,
      module: REPORT_NAVIGATION_MODULE,
    },
    {
      enabled: ENABLE_ADMIN_MODULE,
      module: ADMIN_NAVIGATION_MODULE,
    },
  ],
};
