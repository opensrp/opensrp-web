import { IconProp } from '@fortawesome/fontawesome-svg-core';
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
// client nav parent
export const CLIENT_COLLAPSE_NAVIGATION_LABEL = 'Client Records';
export type CLIENT_COLLAPSE_NAVIGATION_LABEL = typeof CLIENT_COLLAPSE_NAVIGATION_LABEL;
export const CLIENT_COLLAPSE_NAVIGATION_ICON: IconProp = ['far', 'user'];

// client nav nested items
export const CLIENT_PAGE_NAVIGATION_LABEL = 'All Clients';

// nav objects
// client page nav object
export const CLIENT_PAGE_NAVIGATION_OBJECT: NavObj = {
  navLabel: CLIENT_PAGE_NAVIGATION_LABEL,
  navURL: CLIENT_URL,
};

// client module nav object
export const CLIENT_COLLAPSE_NAVIGATION_OBJECT: NavCollapseObj = {
  navIcon: CLIENT_COLLAPSE_NAVIGATION_ICON,
  navLabel: CLIENT_COLLAPSE_NAVIGATION_LABEL,
};
