import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'reactstrap';
import { ENABLE_ABOUT, ENABLE_USERS } from '../../../configs/env';
import { CLIENT_URL } from '../../../constants';
import './SideMenu.css';

class SideMenu extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    return (
      <div>
        <Navbar>
          <Nav className="side-menu-container" navbar={true}>
            <NavItem>
              <NavLink to="/#" className="nav-link" activeClassName="active">
                Home
              </NavLink>
            </NavItem>
            {ENABLE_USERS && (
              <NavItem>
                <NavLink to="/404" className="nav-link" activeClassName="active">
                  Users
                </NavLink>
              </NavItem>
            )}
            {ENABLE_ABOUT && (
              <NavItem>
                <NavLink to="/404" className="nav-link" activeClassName="active">
                  About
                </NavLink>
              </NavItem>
            )}
            <NavItem>
              <NavLink to={CLIENT_URL} className="nav-link" activeClassName="active">
                Clients
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default SideMenu;
