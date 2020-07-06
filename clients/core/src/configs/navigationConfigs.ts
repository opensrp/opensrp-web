import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { SideMenuProps } from '../components/page/SideMenu';
import { ModulePageLink, NavigationModule, PageLink } from '../components/page/SideMenu/SubMenu';
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
    VIEW_RELEASE,
    VIEW_RELEASE_PAGE_URL,
    VIEW_JSON_VALIDATORS,
    VIEW_JSON_VALIDATORS_PAGE_URL,
    VIEW_DRAFT_FILES,
    VIEW_DRAFT_FILES_PAGE_URL,
    SERVER_SETTINGS,
    SERVER_SETTINGS_URL,
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
    ENABLE_VIEW_RELEASE_PAGE,
    ENABLE_VIEW_JSON_VALIDATORS_PAGE,
    ENABLE_VIEW_DRAFT_FILES_PAGE,
    ENABLE_POPULATION_CHARACTERISTICS,
} from './env';

// Page links

const CLIENT_PAGE_NAVIGATION: PageLink = {
    label: ALL_CLIENTS,
    url: CLIENT_URL,
};
const HOUSEHOLD_PAGE_NAVIGATION: PageLink = {
    label: HOUSEHOLD,
    url: HOUSEHOLD_URL,
};
const ANC_PAGE_NAVIGATION: PageLink = {
    label: ANC,
    url: ANC_URL,
};
const CHILD_PAGE_NAVIGATION: PageLink = {
    label: CHILD,
    url: CHILD_URL,
};

const USERS_PAGE_NAVIGATION: PageLink = {
    label: USERS,
    url: USER_URL,
};
const ROLES_PAGE_NAVIGATION: PageLink = {
    label: ROLES,
    url: ROLE_URL,
};
const TEAMS_PAGE_NAVIGATION: PageLink = {
    label: TEAMS,
    url: TEAM_URL,
};
const LOCATIONS_PAGE_NAVIGATION: PageLink = {
    label: LOCATIONS,
    url: LOCATIONS_URL,
};
const VIEW_RELEASE_PAGE_NAVIGATION: PageLink = {
    label: VIEW_RELEASE,
    url: VIEW_RELEASE_PAGE_URL,
};
const VIEW_JSON_VALIDATORS_PAGE_NAVIGATION: PageLink = {
    label: VIEW_JSON_VALIDATORS,
    url: VIEW_JSON_VALIDATORS_PAGE_URL,
};
const VIEW_DRAFT_FILES_PAGE_NAVIGATION: PageLink = {
    label: VIEW_DRAFT_FILES,
    url: VIEW_DRAFT_FILES_PAGE_URL,
};
const CHARACTERISTICS_SETTINGS_NAVIGATION: PageLink = {
    label: SERVER_SETTINGS,
    url: SERVER_SETTINGS_URL,
};

// icons
const clientModuleNavIcon: IconProp = ['far', 'user'];
const reportModuleNavIcon: IconProp = ['fas', 'chart-line'];
const adminModuleNavIcon: IconProp = ['fas', 'cog'];

// Navigation links for navigation module. collapses when clicked to display the pageLinks

const CLIENT_MODULE_PARENT_NAV: ModulePageLink = {
    icon: clientModuleNavIcon,
    label: CLIENT_RECORDS,
};
const REPORT_MODULE_PARENT_NAV: ModulePageLink = {
    icon: reportModuleNavIcon,
    label: REPORTS,
    url: REPORTS_URL,
};
const ADMIN_MODULE_PARENT_NAV: ModulePageLink = {
    icon: adminModuleNavIcon,
    label: ADMIN,
};

// nav module objects
const CLIENT_NAVIGATION_MODULE: NavigationModule = {
    childNavs: [
        ENABLE_CLIENT_PAGE && CLIENT_PAGE_NAVIGATION,
        ENABLE_HOUSEHOLD_PAGE && HOUSEHOLD_PAGE_NAVIGATION,
        ENABLE_ANC_PAGE && ANC_PAGE_NAVIGATION,
        ENABLE_CHILD_PAGE && CHILD_PAGE_NAVIGATION,
    ].filter((childNav): childNav is PageLink => typeof childNav !== 'boolean'),
    parentNav: CLIENT_MODULE_PARENT_NAV,
};
const REPORT_NAVIGATION_MODULE: NavigationModule = {
    childNavs: [],
    parentNav: REPORT_MODULE_PARENT_NAV,
};

const ADMIN_NAVIGATION_MODULE: NavigationModule = {
    childNavs: [
        ENABLE_USER_PAGE && USERS_PAGE_NAVIGATION,
        ENABLE_ROLE_PAGE && ROLES_PAGE_NAVIGATION,
        ENABLE_TEAM_PAGE && TEAMS_PAGE_NAVIGATION,
        ENABLE_LOCATION_PAGE && LOCATIONS_PAGE_NAVIGATION,
        ENABLE_VIEW_RELEASE_PAGE && VIEW_RELEASE_PAGE_NAVIGATION,
        ENABLE_VIEW_JSON_VALIDATORS_PAGE && VIEW_JSON_VALIDATORS_PAGE_NAVIGATION,
        ENABLE_VIEW_DRAFT_FILES_PAGE && VIEW_DRAFT_FILES_PAGE_NAVIGATION,
        ENABLE_POPULATION_CHARACTERISTICS && CHARACTERISTICS_SETTINGS_NAVIGATION,
    ].filter<PageLink>((childNav: PageLink | boolean): childNav is PageLink => typeof childNav !== 'boolean'),
    parentNav: ADMIN_MODULE_PARENT_NAV,
};

/** Enable Clients Module from its child pages */
const ENABLE_CLIENT_RECORDS_MODULE =
    ENABLE_ANC_PAGE || ENABLE_CLIENT_PAGE || ENABLE_HOUSEHOLD_PAGE || ENABLE_HOUSEHOLD_PAGE;
type ENABLE_CLIENT_RECORDS_MODULE = typeof ENABLE_CLIENT_RECORDS_MODULE;

/** Enable Admin Module from its child pages */
const ENABLE_ADMIN_MODULE =
    ENABLE_USER_PAGE ||
    ENABLE_ROLE_PAGE ||
    ENABLE_TEAM_PAGE ||
    ENABLE_LOCATION_PAGE ||
    ENABLE_VIEW_RELEASE_PAGE ||
    ENABLE_VIEW_DRAFT_FILES_PAGE ||
    ENABLE_VIEW_JSON_VALIDATORS_PAGE ||
    ENABLE_POPULATION_CHARACTERISTICS;
type ENABLE_ADMIN_MODULE = typeof ENABLE_ADMIN_MODULE;

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
