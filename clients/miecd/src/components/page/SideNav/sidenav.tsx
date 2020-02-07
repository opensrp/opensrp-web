import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User } from '@onaio/session-reducer';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import {
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarToggler,
    NavItem,
    UncontrolledDropdown,
} from 'reactstrap';
import logo from '../../../assets/images/logo.png';
// import { ENABLE_ABOUT, ENABLE_CLIENTS, ENABLE_USERS, WEBSITE_NAME } from '../../../configs/env';
// import { CLIENT_URL, LOGIN_URL, LOGOUT_URL } from '../../../constants';
import './sidenav.css';

/** The side navigation component */
export class SidenavComponent extends React.Component {
    public render() {
        return (
            <div id="sidenav">
                <Nav className="flex-column" navbar={true}>
                    <NavItem>
                        <NavLink to="/" className="nav-link navbar-inverse" activeClassName="active" id="link-font">
                            Home
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            to="/log-face"
                            className="nav-link navbar-inverse"
                            activeClassName="active"
                            id="link-font"
                        >
                            Log Face
                        </NavLink>
                    </NavItem>
                </Nav>
            </div>
        );
    }

    //   private toggle() {
    //     this.setState({ isOpen: !this.state.isOpen });
    //   }
}

// const Sidenav = withRouter(SidenavComponent);

export default SidenavComponent;
