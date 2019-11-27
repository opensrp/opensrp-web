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
  UncontrolledDropdown,
} from 'reactstrap';
import logo from '../../../assets/images/logo.png';
import logo2 from '../../../assets/images/vietnam-moh.png';
import { WEBSITE_NAME } from '../../../configs/env';
import { LOGIN_URL, LOGOUT_URL } from '../../../constants';
import { headerShouldNotRender } from '../../../helpers/utils';
import './Header.css';

/** interface for Header state */
interface State {
  isOpen: boolean;
}

/** interface for HeaderProps */
export interface HeaderProps extends RouteComponentProps {
  authenticated: boolean;
  user: User;
  extraData: { [key: string]: any };
}

/** default props for Header */
const defaultHeaderProps: Partial<HeaderProps> = {
  authenticated: false,
  extraData: {},
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
    if (headerShouldNotRender()) {
      return null;
    }
    const { authenticated, user } = this.props;
    return (
      <Navbar expand="md">
        <nav id="image-settings">
          <Link to="/">
            <img src={logo} alt={WEBSITE_NAME} />
            <img src={logo2} alt={WEBSITE_NAME} />
          </Link>
        </nav>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar={true}>
          <Nav className="ml-auto" navbar={true}>
            {authenticated ? (
              <UncontrolledDropdown nav={true} inNavbar={true}>
                <DropdownToggle nav={true} caret={true}>
                  <FontAwesomeIcon icon={['far', 'user']} /> {user.username}
                </DropdownToggle>
                <DropdownMenu right={true}>
                  <DropdownItem>
                    <NavLink to={LOGOUT_URL} className="nav-link" activeClassName="active">
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
        </Collapse>
      </Navbar>
    );
  }

  private toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }
}

const Header = withRouter(HeaderComponent);

export default Header;
