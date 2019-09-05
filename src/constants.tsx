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

// side nav confs
// collapse labels
export const CLIENT_COLLAPSE_NAVIGATION_LABEL = 'Client Records';
export type CLIENT_COLLAPSE_NAVIGATION_LABEL = typeof CLIENT_COLLAPSE_NAVIGATION_LABEL;

// icons
export const CLIENT_COLLAPSE_NAVIGATION_ICON: IconProp = ['far', 'user'];

// nested labels
export const CLIENT_PAGE_NAVIGATION_LABEL = 'All Clients';
export type CLIENT_PAGE_NAVIGATION_LABEL = typeof CLIENT_PAGE_NAVIGATION_LABEL;

// nav objects
// client page
export const CLIENT_PAGE_NAVIGATION_OBJECT: NavObj = {
  navLabel: CLIENT_PAGE_NAVIGATION_LABEL,
  navURL: CLIENT_URL,
};

// collapse nav object
// client
export const CLIENT_COLLAPSE_NAVIGATION_OBJECT: NavCollapseObj = {
  navIcon: CLIENT_COLLAPSE_NAVIGATION_ICON,
  navLabel: CLIENT_COLLAPSE_NAVIGATION_LABEL,
};

// nav module objects
export const CLIENT_NAVIGATION_MODULE_OBJECT: NavModuleObj = {
  childNavs: [CLIENT_PAGE_NAVIGATION_OBJECT],
  parentNav: CLIENT_COLLAPSE_NAVIGATION_OBJECT,
};
