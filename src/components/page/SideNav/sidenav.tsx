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
import { ENABLE_ABOUT, ENABLE_CLIENTS, ENABLE_USERS, WEBSITE_NAME } from '../../../configs/env';
import { CLIENT_URL, LOGIN_URL, LOGOUT_URL } from '../../../constants';
import './sidenav.css';

// /** interface for Header state */
// interface State {
//   isOpen: boolean;
// }

// /** interface for HeaderProps */
// export interface HeaderProps extends RouteComponentProps {
//   authenticated: boolean;
//   user: User;
// }

// /** default props for Header */
// const defaultHeaderProps: Partial<HeaderProps> = {
//   authenticated: false,
//   user: {
//     email: '',
//     name: '',
//     username: '',
//   },
// };

/** The Header component */
export class SidenavComponent extends React.Component {
  //   public static defaultProps = defaultHeaderProps;

  //   constructor(props: HeaderProps) {
  //     super(props);

  //     this.toggle = this.toggle.bind(this);
  //     this.state = {
  //       isOpen: false,
  //     };
  //   }

  public render() {
    // const { authenticated, user } = this.props;
    // const path = this.props.location.pathname;
    return (
      <div id="sidenav">
        {/* <Navbar color="light" light={true} expand="md"> */}
        {/* <NavbarToggler onClick={this.toggle} /> */}
        {/* <Collapse isOpen={this.state.isOpen} navbar={true}> */}
        <Nav className="flex-column" navbar={true}>
          <NavItem>
            <NavLink
              to="/"
              className="nav-link navbar-inverse"
              activeClassName="active"
              id="link-font"
            >
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
        {/* </Collapse> */}
        {/* </Navbar> */}
      </div>
    );
  }

  //   private toggle() {
  //     this.setState({ isOpen: !this.state.isOpen });
  //   }
}

// const Sidenav = withRouter(SidenavComponent);

export default SidenavComponent;
