import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Collapse, Nav, NavItem } from 'reactstrap';
import { CLIENT_NAVIGATION_MODULE_OBJECT } from '../../../constants';
import './SubMenu.css';

export interface NavObj {
  navLabel: string;
  navURL: string;
}

export interface NavCollapseObj {
  navLabel: string;
  navIcon: IconProp;
}

export interface SubMenuProps {
  identifier: string;
  isCollapseMenuActive: boolean;
  isExpand: boolean;
  parentNav: NavCollapseObj;
  childNavs: NavObj[];
  setSideMenuActive: any;
  setSideMenuToggle: any;
}

/** By default load Clients Sub Menu */
export const defaultSubMenuProps: SubMenuProps = {
  ...CLIENT_NAVIGATION_MODULE_OBJECT,
  isCollapseMenuActive: false,
  isExpand: true,
  setSideMenuActive: null,
  setSideMenuToggle: null,
};

class SubMenu extends React.Component<SubMenuProps, {}> {
  public static defaultProps = defaultSubMenuProps;
  constructor(props: SubMenuProps) {
    super(props);
  }

  public render() {
    const { childNavs, parentNav } = this.props;
    return (
      <div>
        <Nav>
          <NavItem onClick={this.toggle}>
            <a
              className={classNames('nav', 'nav-link', 'side-nav-item', {
                'active-collapse-menu': this.props.isCollapseMenuActive,
              })}
            >
              <FontAwesomeIcon icon={parentNav.navIcon} />
              <span> {parentNav.navLabel} </span>
            </a>
          </NavItem>
        </Nav>
        <Collapse isOpen={this.props.isExpand}>
          {childNavs.map((childNavObj, key) => {
            return (
              <Nav key={'child-nav-' + key}>
                <NavItem>
                  <NavLink
                    to={childNavObj.navURL}
                    className="nav-link side-nav-item"
                    activeClassName="side-nav-active"
                    onClick={this.setActiveClassNameToCollapse}
                  >
                    <span> {childNavObj.navLabel} </span>
                  </NavLink>
                </NavItem>
              </Nav>
            );
          })}
        </Collapse>
      </div>
    );
  }

  private toggle = () => {
    this.props.setSideMenuToggle(this.props.identifier);
  };

  private setActiveClassNameToCollapse = () => {
    this.props.setSideMenuActive(this.props.identifier);
  };
}

export default SubMenu;
