import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User } from '@onaio/session-reducer';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';
import logo from '../../../assets/images/logo.png';
import { WEBSITE_NAME } from '../../../configs/env';
import { LOGIN_URL, LOGOUT_URL } from '../../../constants';
import './Header.css';

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
export class HeaderComponent extends React.Component<HeaderProps> {
  public static defaultProps = defaultHeaderProps;

  constructor(props: HeaderProps) {
    super(props);
  }

  public render() {
    const { authenticated, user } = this.props;
    return (
      <Row>
        <Navbar
          color="light"
          className="nav-fill w-100 bg-navbar fixed-top"
          light={true}
          expand="md"
        >
          <Col md={2} className="bg-top-nav">
            <nav className="navbar navbar-expand-md navbar-light">
              <Link to="/" className="navbar-brand">
                <img src={logo} alt={WEBSITE_NAME} />
              </Link>
            </nav>
          </Col>
          <Col md={8} />
          <Col md={2} className="bg-top-nav">
            <Nav className="navbar navbar-expand-md center-account-text">
              {authenticated ? (
                <UncontrolledDropdown nav={true} inNavbar={true}>
                  <DropdownToggle nav={true} caret={true} className="account-text">
                    <FontAwesomeIcon icon={['far', 'user']} /> {user.username}
                  </DropdownToggle>
                  <DropdownMenu right={true}>
                    <DropdownItem>
                      <NavLink
                        to={LOGOUT_URL}
                        className="nav-link bg-dropdown-text"
                        activeClassName="active"
                      >
                        Sign Out
                      </NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              ) : (
                <NavLink to={LOGIN_URL} className="nav-link account-text" activeClassName="active">
                  Login
                </NavLink>
              )}
            </Nav>
          </Col>
        </Navbar>
      </Row>
    );
  }
}

const Header = withRouter(HeaderComponent);

export default Header;
