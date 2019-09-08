import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Nav, Navbar, NavItem, Row } from 'reactstrap';
import { ENABLE_ABOUT, ENABLE_USERS } from '../../../configs/env';
import {
  ADMIN_NAVIGATION_MODULE_OBJECT,
  CLIENT_NAVIGATION_MODULE_OBJECT,
  CLIENT_URL,
  REPORT_NAVIGATION_MODULE_OBJECT,
} from '../../../constants';
import SubMenu, { NavCollapseObj, NavObj, SubMenuProps } from '../SubMenu/SubMenu';
import './SideMenu.css';

export interface NavModuleObj {
  identifier: string;
  parentNav: NavCollapseObj;
  childNavs: NavObj[];
}

export interface SideMenuState {
  isActive: string[];
  isExpand: string[];
}

const sideMenuState = {
  isActive: [],
  isExpand: [],
};

class SideMenu extends React.Component<{}, SideMenuState> {
  constructor(props: {}) {
    super(props);
    this.state = sideMenuState;
  }

  public render() {
    const clientSubMenuProps: SubMenuProps = {
      ...CLIENT_NAVIGATION_MODULE_OBJECT,
      isCollapseMenuActive: this.state.isActive.includes(
        CLIENT_NAVIGATION_MODULE_OBJECT.identifier
      ),
      isExpand: this.state.isExpand.includes(CLIENT_NAVIGATION_MODULE_OBJECT.identifier),
      setSideMenuActive: this.setMenuActive,
      setSideMenuToggle: this.setExpandToggle,
    };
    const reportSubMenuProps: SubMenuProps = {
      ...REPORT_NAVIGATION_MODULE_OBJECT,
      isCollapseMenuActive: this.state.isActive.includes(
        REPORT_NAVIGATION_MODULE_OBJECT.identifier
      ),
      isExpand: this.state.isExpand.includes(REPORT_NAVIGATION_MODULE_OBJECT.identifier),
      setSideMenuActive: this.setMenuActive,
      setSideMenuToggle: this.setExpandToggle,
    };
    const adminSubMenuProps: SubMenuProps = {
      ...ADMIN_NAVIGATION_MODULE_OBJECT,
      isCollapseMenuActive: this.state.isActive.includes(ADMIN_NAVIGATION_MODULE_OBJECT.identifier),
      isExpand: this.state.isExpand.includes(ADMIN_NAVIGATION_MODULE_OBJECT.identifier),
      setSideMenuActive: this.setMenuActive,
      setSideMenuToggle: this.setExpandToggle,
    };
    return (
      <div className="side-menu-container">
        <Row>
          <Col>
            <Navbar>
              <Nav navbar={true}>
                <NavItem>
                  <NavLink
                    to="/"
                    className="nav-link side-nav-item"
                    activeClassName="side-nav-active"
                  >
                    Home
                  </NavLink>
                </NavItem>
                {ENABLE_USERS && (
                  <NavItem>
                    <NavLink
                      to="/404"
                      className="nav-link side-nav-item"
                      activeClassName="side-nav-active"
                    >
                      Users
                    </NavLink>
                  </NavItem>
                )}
                {ENABLE_ABOUT && (
                  <NavItem>
                    <NavLink
                      to="/404"
                      className="nav-link side-nav-item"
                      activeClassName="side-nav-active"
                    >
                      About
                    </NavLink>
                  </NavItem>
                )}
                <NavItem>
                  <NavLink
                    to={CLIENT_URL}
                    className="nav-link side-nav-item"
                    activeClassName="side-nav-active"
                  >
                    Clients
                  </NavLink>
                </NavItem>
                <SubMenu {...clientSubMenuProps} />
                <SubMenu {...reportSubMenuProps} />
                <SubMenu {...adminSubMenuProps} />
              </Nav>
            </Navbar>
          </Col>
        </Row>
      </div>
    );
  }

  private setMenuActive = (sideMenuIdentifier: string): void => {
    this.setState({ ...this.state, isActive: [sideMenuIdentifier] });
  };

  private setExpandToggle = (sideMenuIdentifier: string): void => {
    if (this.state.isExpand.includes(sideMenuIdentifier)) {
      this.setState({ ...this.state, isExpand: [] });
    } else {
      this.setState({ ...this.state, isExpand: [sideMenuIdentifier] });
    }
  };
}

export default SideMenu;
