import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User } from '@onaio/session-reducer';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import {
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';
import logo from '../../../assets/images/logo.png';
import { ENABLE_ABOUT, ENABLE_USERS, WEBSITE_NAME } from '../../../configs/env';
import { CLIENT_URL, LOGIN_URL, LOGOUT_URL } from '../../../constants';
import './Header.css';

/** interface for Header state */
interface State {
  isOpen: boolean;
}

/** interface for HeaderProps */
export interface HeaderProps extends RouteComponentProps {
  authenticated: boolean;
  user: User;
}

/** default props for Header */
const defaultHeaderProps: Partial<HeaderProps> = {
  authenticated: false,
  user: {
    email: '',
    name: '',
    username: '',
  },
};

/** The Header component */
export class HeaderComponent extends React.Component<HeaderProps, State> {
  public static defaultProps = defaultHeaderProps;

  constructor(props: HeaderProps) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  public render() {
    const { authenticated, user } = this.props;
    return (
      <div>
        <Row>
          <Navbar color="light" className="nav-fill w-100 bg-navbar" light={true} expand="md">
            <Col md={2} className="bg-top-nav">
              <nav className="navbar navbar-expand-md navbar-light">
                <Link to="/" className="navbar-brand">
                  <img src={logo} alt={WEBSITE_NAME} />
                </Link>
              </nav>
            </Col>
            <Col md={8}>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar={true}>
                <Nav className="mr-auto" navbar={true}>
                  <NavItem>
                    <NavLink to="/" className="nav-link" activeClassName="active">
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
              </Collapse>
            </Col>
            <Col md={2} className="bg-top-nav">
              <Nav className="navbar navbar-expand-md account-text">
                {authenticated ? (
                  <UncontrolledDropdown nav={true} inNavbar={true}>
                    <DropdownToggle nav={true} caret={true}>
                      <FontAwesomeIcon icon={['far', 'user']} /> {user.username}
                    </DropdownToggle>
                    <DropdownMenu right={true}>
                      <DropdownItem>
                        <NavLink to={LOGOUT_URL} className="nav-link bg-dropdown-text" activeClassName="active">
                          Sign Out
                        </NavLink>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                ) : (
                  <NavLink to={LOGIN_URL} className="nav-link" activeClassName="active">
                    Login
                  </NavLink>
                )}
              </Nav>
            </Col>
          </Navbar>
        </Row>
      </div>
    );
  }

  private toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }
}

const Header = withRouter(HeaderComponent);

export default Header;
