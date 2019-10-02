import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { Fragment } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Collapse, Nav, NavItem } from 'reactstrap';
import './index.css';

/** interface for a module i.e group of related pages
 * @property {string} parentNav - Page navigation for the module, collapses to reveal the page links
 * @property {PageLink[]} childNavs - pageLinks to pages under this navigational module
 */
export interface NavigationModule {
  parentNav: ModulePageLink;
  childNavs: PageLink[];
}

/** interface for objs describing links to different pages
 * @property {string} label - the link's displayable text
 * @property {string} url - URL to get redirected on click
 */
export interface PageLink {
  label: string;
  url: string;
}

/** interface for the module page links, module represents collection of related page links
 * @property {string} label - text label visible on menu item
 * @property {IconProp} icon- fontAwesome icon displayed on menu item
 * @property {string} url - url that module link will redirect to
 */
export interface ModulePageLink {
  label: string;
  icon: IconProp;
  url?: string;
}

/** props for this component
 * @property {ModulePageLink} parentNav - object describing navigation data for the module page link
 * @property {PageLink[]} childNavs - array of the pageNavigation links grouped under this navigation module
 * @property {string} collapsedModuleLabel - string literal with the label value of currently collapsed module navigation link
 * @property {setCollapsedModuleLabel} setCollapsedModuleLabel - callback to parent component;
 *            changes the collapsedModuleLabel entry in the parent component
 */
export interface SubMenuProps {
  parentNav: ModulePageLink;
  childNavs: PageLink[];
  collapsedModuleLabel: string;
  setCollapsedModuleLabel?: SetCollapsedModuleLabel;
}

/** this components state
 * @property {boolean} collapseMenu - whether the child navigation links should be collapsed or hidden
 */
export interface SubMenuState {
  isActiveModule: boolean;
}

/** takes a string and updates the current collapsed-module-label in the parent component
 * @param {string} label - label of clicked navigation module pagelink
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
      <div id="sub-menu">
        <Nav className="side-collapse-nav" onClick={this.setModuleLabel}>
          <NavItem>
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
    const labelAlreadySet = this.props.collapsedModuleLabel === this.props.parentNav.label;
    labelAlreadySet && this.props.setCollapsedModuleLabel !== undefined
      ? this.props.setCollapsedModuleLabel('')
      : this.props.setCollapsedModuleLabel!(this.props.parentNav.label);
  };
}

export default withRouter(SubMenu);
