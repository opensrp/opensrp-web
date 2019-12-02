import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { Fragment } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Collapse, Nav, NavItem } from 'reactstrap';
import './index.css';

/** interface for a module i.e group of related pages */
export interface NavigationModule {
  /** Page navigation for the module, collapses to reveal the page links */
  parentNav: ModulePageLink;
  /** pageLinks to pages under this navigational module */
  childNavs: PageLink[];
}

/** interface for objs describing links to different pages */
export interface PageLink {
  /** the link's displayable text */
  label: string;
  /** URL to get redirected on click */
  url: string;
}

/** interface for the module page links, module represents collection of related page links */
export interface ModulePageLink {
  /** text label visible on menu item */
  label: string;
  /** fontAwesome icon displayed on menu item */
  icon: IconProp;
  /** url that module link will redirect to */
  url?: string;
}

/** props for this component */
export interface SubMenuProps {
  /** object describing navigation data for the module page link */
  parentNav: ModulePageLink;
  /** array of the pageNavigation links grouped under this navigation module */
  childNavs: PageLink[];
  /** string literal with the label value of currently collapsed module navigation link */
  collapsedModuleLabel: string | null;
  /** callback to parent component changes the collapsedModuleLabel
   *  entry in the parent component
   */
  setCollapsedModuleLabel?: SetCollapsedModuleLabel;
}

/** this components state */
export interface SubMenuState {
  /** whether the child navigation links should be collapsed or hidden */
  isActiveModule: boolean;
}

/** takes a string and updates the current collapsed-module-label in the parent component
 * @param {string} label - label of clicked navigation module page link
 */
type SetCollapsedModuleLabel = (label: string) => void;

/** Default props */
export const defaultSubMenuProps: SubMenuProps = {
  childNavs: [],
  collapsedModuleLabel: '',
  parentNav: {
    icon: ['far', 'user'],
    label: 'home',
  },
};

/** intersection of all types describing the props */
type subMenuPropsTypes = SubMenuProps & RouteComponentProps;

/** The SubMenu component */
export class SubMenu extends React.Component<subMenuPropsTypes, SubMenuState> {
  public static defaultProps = defaultSubMenuProps;

  public render() {
    const { childNavs, parentNav, collapsedModuleLabel, location } = this.props;
    const pathName = location.pathname;
    /** whether to collapse the child pages for this navigation module */
    const collapseMenu: boolean = collapsedModuleLabel === parentNav.label;
    /** whether the navigation module is currently active; judging from the history.location pathname
     * set to true if one of the module navigation's children has a url similar to pathname or
     * if the url of the parentNav is similar to the pathname
     */
    const isActiveModule: boolean =
      childNavs.map(nav => nav.url).indexOf(pathName!) > -1 || parentNav.url === pathName;

    const moduleLinkJsx = (
      <Fragment>
        <FontAwesomeIcon icon={parentNav.icon} size="lg" />
        <span className="collapse-menu-title"> {parentNav.label} </span>
      </Fragment>
    );

    const moduleLinkClassName = classNames('nav', 'nav-link', 'side-nav-item', {
      'active-collapse-menu': isActiveModule,
    });

    return (
      <div id={`sub-menu-${parentNav.label.replace(' ', '-')}`}>
        <Nav
          id={parentNav.label.replace(' ', '-')}
          className="side-collapse-nav"
          onClick={this.setModuleLabel}
        >
          <NavItem id="module-link">
            {parentNav.url ? (
              <NavLink to={parentNav.url} className={moduleLinkClassName}>
                {moduleLinkJsx}
              </NavLink>
            ) : (
              <span className={moduleLinkClassName}>{moduleLinkJsx}</span>
            )}
          </NavItem>
        </Nav>

        <Collapse isOpen={collapseMenu}>
          {childNavs.map((childNavObj, key) => {
            return (
              <Nav key={'child-nav-' + key}>
                <NavItem className="nav-item-extend">
                  <NavLink
                    to={childNavObj.url}
                    className="nav-link side-nav-item"
                    activeClassName="side-nav-active"
                  >
                    <span> {childNavObj.label} </span>
                  </NavLink>
                </NavItem>
              </Nav>
            );
          })}
        </Collapse>
      </div>
    );
  }

  /** updates parent component with the label of the currently collapsed navigation module */
  private setModuleLabel = () => {
    const { setCollapsedModuleLabel, collapsedModuleLabel, parentNav } = this.props;

    const isLabelSet = collapsedModuleLabel === parentNav.label;
    // if label is already set then this will behave as a toggle
    isLabelSet && setCollapsedModuleLabel !== undefined
      ? setCollapsedModuleLabel('')
      : setCollapsedModuleLabel!(this.props.parentNav.label);
  };
}

export default withRouter(SubMenu);
