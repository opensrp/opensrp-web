import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Collapse, Nav, NavbarToggler, NavItem } from 'reactstrap';
import { CLIENT_COLLAPSE_NAVIGATION_OBJECT, CLIENT_PAGE_NAVIGATION_OBJECT } from '../../../constants';
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
  collapse: boolean;
  parentNav: NavCollapseObj;
  childNavs: NavObj[];
}

/** By default load Clients Sub Menu */
export const defaultSubMenuProps: SubMenuProps = {
  childNavs: [CLIENT_PAGE_NAVIGATION_OBJECT, CLIENT_PAGE_NAVIGATION_OBJECT],
  collapse: true,
  parentNav: CLIENT_COLLAPSE_NAVIGATION_OBJECT,
};

export interface SubMenuState {
  isCollapse: boolean;
}

class SubMenu extends React.Component<SubMenuProps, SubMenuState> {
  public static defaultProps = defaultSubMenuProps;
  constructor(props: SubMenuProps) {
    super(props);
    const { collapse } = this.props;
    this.state = {
      isCollapse: collapse,
    };
  }

  public render() {
    const { childNavs, parentNav } = this.props;
    return (
      <div>
        <Nav>
          <NavItem onClick={this.toggle}>
            <a className="nav-link side-nav-item">
              <FontAwesomeIcon icon={parentNav.navIcon} />
              <span> {parentNav.navLabel} </span>
            </a>
          </NavItem>
        </Nav>
        <Collapse isOpen={!this.state.isCollapse}>
          {childNavs.map((childNavObj, key) => {
            return (
              <Nav key={'child-nav-' + key}>
                <NavItem>
                  <NavLink
                    to={childNavObj.navURL}
                    className="nav-link side-nav-item"
                    activeClassName="side-nav-active"
                  >
                    <span> {childNavObj.navLabel} </span>
                  </NavLink>
                </NavItem>
              </Nav>);
          })}
        </Collapse>
      </div>
    );
  }

  private toggle = () => {
    this.setState({ isCollapse: !this.state.isCollapse });
  };
}

export default SubMenu;
