import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Nav, Navbar, NavItem, Row } from 'reactstrap';
import { ENABLE_ABOUT, ENABLE_USERS } from '../../../configs/env';
import { CLIENT_URL } from '../../../constants';
import { NavCollapseObj, NavObj } from '../SubMenu/SubMenu';
import './SideMenu.css';

export interface NavModuleObj {
  parentNav: NavCollapseObj;
  childNavs: NavObj[];
}

class SideMenu extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render() {
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
              </Nav>
            </Navbar>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SideMenu;
