import { ModulePageLink, NavigationModule, PageLink } from './SubMenu';

import {
  ADMIN,
  ALL_CLIENTS,
  ANALYSIS,
  ANC,
  ANC_URL,
  CHILD,
  CHILD_URL,
  CLIENT_RECORDS,
  CLIENT_URL,
  COMPARTMENTS,
  HOME,
  HOME_URL,
  HOUSEHOLD,
  HOUSEHOLD_URL,
  LOCATIONS,
  LOCATIONS_URL,
  LOGFACE,
  NBC_AND_PNC,
  NBC_AND_PNC_ANALYSIS_URL,
  NBC_AND_PNC_COMPARTMENTS_URL,
  NBC_AND_PNC_URL,
  NUTRITION,
  NUTRITION_ANALYSIS_URL,
  NUTRITION_COMPARTMENTS_URL,
  NUTRITION_LOGFACE_URL,
  NUTRITION_URL,
  PNC_AND_NBC_LOGFACE_URL,
  PREGNANCY,
  PREGNANCY_ANALYSIS_URL,
  PREGNANCY_COMPARTMENTS_URL,
  PREGNANCY_LOGFACE_URL,
  PREGNANCY_URL,
  REPORTS,
  REPORTS_URL,
  ROLE_URL,
  ROLES,
  TEAM_URL,
  TEAMS,
  USER_URL,
  USERS,
} from '../../../constants';

import { IconProp } from '@fortawesome/fontawesome-svg-core';

import {
  ENABLE_ANC_PAGE,
  ENABLE_CHILD_PAGE,
  ENABLE_CLIENT_PAGE,
  ENABLE_HOUSEHOLD_PAGE,
  ENABLE_LOCATION_PAGE,
  ENABLE_ROLE_PAGE,
  ENABLE_TEAM_PAGE,
  ENABLE_USER_PAGE,
} from '../../../configs/env';

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

export const PREGNANCY_PAGE_NAVIGATION: PageLink = {
  label: PREGNANCY,
  url: PREGNANCY_URL,
};

export const NUTRITION_PAGE_NAVIGATION: PageLink = {
  label: NUTRITION,
  url: NUTRITION_URL,
};

export const NEWBORN_AND_POSTNATAL_PAGE_NAVIGATION: PageLink = {
  label: NBC_AND_PNC,
  url: NBC_AND_PNC_URL,
};

export const PREGNANCY_COMPARTMENTS_PAGE_NAVIGATION: PageLink = {
  label: COMPARTMENTS,
  url: PREGNANCY_COMPARTMENTS_URL,
};

export const NBC_AND_PNC_COMPARTMENTS_PAGE_NAVIGATION: PageLink = {
  label: COMPARTMENTS,
  url: NBC_AND_PNC_COMPARTMENTS_URL,
};

export const NUTRITION_COMPARTMENTS_PAGE_NAVIGATION: PageLink = {
  label: COMPARTMENTS,
  url: NUTRITION_COMPARTMENTS_URL,
};

export const NBC_AND_PNC_LOGFACE_PAGE_NAVIGATION: PageLink = {
  label: LOGFACE,
  url: PNC_AND_NBC_LOGFACE_URL,
};

export const PREGNANCY_LOGFACE_PAGE_NAVIGATION: PageLink = {
  label: LOGFACE,
  url: PREGNANCY_LOGFACE_URL,
};

export const NUTRITION_LOGFACE_PAGE_NAVIGATION: PageLink = {
  label: LOGFACE,
  url: NUTRITION_LOGFACE_URL,
};

export const PREGNANCY_ANALYSIS_PAGE_NAVIGATION: PageLink = {
  label: ANALYSIS,
  url: PREGNANCY_ANALYSIS_URL,
};

export const NBC_AND_PNC_ANALYSIS_PAGE_NAVIGATION: PageLink = {
  label: ANALYSIS,
  url: NBC_AND_PNC_ANALYSIS_URL,
};

export const NUTRITION_ANALYSIS_PAGE_NAVIGATION: PageLink = {
  label: ANALYSIS,
  url: NUTRITION_ANALYSIS_URL,
};

// icons
export const homeNavIcon: IconProp = ['fas', 'home'];
export const pregancyNavIcon: IconProp = ['far', 'user'];
export const nbcandpncNavIcon: IconProp = ['far', 'user'];
export const nutritionNavIcon: IconProp = ['far', 'user'];
export const newbornAndPostnatalNavIcon: IconProp = ['far', 'user'];
export const clientModuleNavIcon: IconProp = ['far', 'user'];
export const reportModuleNavIcon: IconProp = ['fas', 'chart-line'];
export const adminModuleNavIcon: IconProp = ['fas', 'cog'];

// Navigation links for navigation module. collapses when clicked to display the pageLinks

export const HOME_PARENT_NAV: ModulePageLink = {
  icon: homeNavIcon,
  label: HOME,
  url: HOME_URL,
};

export const NBC_AND_PNC_PARENT_NAV: ModulePageLink = {
  icon: nbcandpncNavIcon,
  label: NBC_AND_PNC,
  url: NBC_AND_PNC_URL,
};

export const NUTRITION_PARENT_NAVIGATION: ModulePageLink = {
  icon: nutritionNavIcon,
  label: NUTRITION,
  url: NUTRITION_URL,
};

export const PREGNANCY_MODULE_PARENT_NAV: ModulePageLink = {
  icon: pregancyNavIcon,
  label: PREGNANCY,
  url: PREGNANCY_URL,
};

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
export const HOME_NAVIGATION_MODULE: NavigationModule = {
  childNavs: [],
  parentNav: HOME_PARENT_NAV,
};

export const PREGNANCY_NAVIGATION_MODULE: NavigationModule = {
  childNavs: [
    PREGNANCY_LOGFACE_PAGE_NAVIGATION,
    PREGNANCY_COMPARTMENTS_PAGE_NAVIGATION,
    PREGNANCY_ANALYSIS_PAGE_NAVIGATION,
  ].filter((childNav): childNav is PageLink => typeof childNav !== 'boolean'),
  parentNav: PREGNANCY_MODULE_PARENT_NAV,
};

export const NBC_AND_PNC_NAVIGATION_MODULE: NavigationModule = {
  childNavs: [
    NBC_AND_PNC_LOGFACE_PAGE_NAVIGATION,
    NBC_AND_PNC_COMPARTMENTS_PAGE_NAVIGATION,
    NBC_AND_PNC_ANALYSIS_PAGE_NAVIGATION,
  ],
  parentNav: NBC_AND_PNC_PARENT_NAV,
};

export const NUTRITION_MODULE: NavigationModule = {
  childNavs: [
    NUTRITION_LOGFACE_PAGE_NAVIGATION,
    NUTRITION_COMPARTMENTS_PAGE_NAVIGATION,
    NUTRITION_ANALYSIS_PAGE_NAVIGATION,
  ],
  parentNav: NUTRITION_PARENT_NAVIGATION,
};

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
