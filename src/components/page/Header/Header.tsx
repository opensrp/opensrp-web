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
import { LOGIN, LOGIN_URL, LOGOUT_URL, SIGN_OUT } from '../../../constants';
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

  public render() {
    const { authenticated, user } = this.props;
    return (
      <Row>
        <Navbar className="w-100 bg-navbar" expand="sm" fixed="top">
          <Col sm={3} md={2} className="bg-top-nav">
            <nav className="navbar navbar-expand-md navbar-light">
              <Link to="/" className="navbar-brand">
                <img src={logo} alt={WEBSITE_NAME} />
              </Link>
            </nav>
          </Col>
          <Col sm={5} md={8} />
          <Col sm={4} md={2} className="bg-top-nav">
            <Nav className="navbar navbar-expand-md center-account-text">
              {authenticated ? (
                <UncontrolledDropdown nav={true} inNavbar={true}>
                  <DropdownToggle nav={true} caret={true} className="account-text">
                    <FontAwesomeIcon icon={['far', 'user']} /> {user.username}
                  </DropdownToggle>
                  <DropdownMenu left={true}>
                    <DropdownItem>
                      <NavLink
                        to={LOGOUT_URL}
                        className="nav-link bg-dropdown-text"
                        activeClassName="active"
                      >
                        {SIGN_OUT}
                      </NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              ) : (
                <NavLink to={LOGIN_URL} className="nav-link account-text" activeClassName="active">
                  {LOGIN}
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
