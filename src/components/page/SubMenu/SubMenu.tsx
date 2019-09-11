import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Collapse, Nav, NavItem } from 'reactstrap';
import { CLIENT_NAVIGATION_MODULE_OBJECT } from '../../../constants';
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
  identifier: string;
  isCollapseMenuActive: boolean;
  isExpand: boolean;
  parentNav: NavCollapseObj;
  childNavs: NavObj[];
  setSideMenuToggle: any;
}

export interface SubMenuState {
  isCollapseMenuActive: boolean;
}

/** By default load Clients Sub Menu */
export const defaultSubMenuProps: SubMenuProps = {
  ...CLIENT_NAVIGATION_MODULE_OBJECT,
  isCollapseMenuActive: false,
  isExpand: true,
  setSideMenuToggle: null,
};

class SubMenu extends React.Component<SubMenuProps & RouteComponentProps, SubMenuState> {
  public static defaultProps = defaultSubMenuProps;
  constructor(props: SubMenuProps & RouteComponentProps) {
    super(props);
    this.state = {
      isCollapseMenuActive: this.props.isCollapseMenuActive,
    };
  }
  public componentDidMount() {
    this.updateCollapseMenuStatus();
  }

  public componentDidUpdate() {
    this.updateCollapseMenuStatus();
  }

  public render() {
    const { childNavs, parentNav } = this.props;
    return (
      <div>
        <Nav className="side-collapse-nav" onClick={this.toggle}>
          <NavItem>
            <a
              className={classNames('nav', 'nav-link', 'side-nav-item', {
                'active-collapse-menu': this.state.isCollapseMenuActive,
              })}
            >
              <FontAwesomeIcon icon={parentNav.navIcon} size="lg" />
              <span className="collapse-menu-title"> {parentNav.navLabel} </span>
            </a>
          </NavItem>
        </Nav>
        <Collapse isOpen={this.props.isExpand}>
          {childNavs.map((childNavObj, key) => {
            return (
              <Nav key={'child-nav-' + key}>
                <NavItem className="nav-item-extend">
                  <NavLink
                    to={childNavObj.navURL}
                    className="nav-link side-nav-item"
                    activeClassName="side-nav-active"
                  >
                    <span> {childNavObj.navLabel} </span>
                  </NavLink>
                </NavItem>
              </Nav>
            );
          })}
        </Collapse>
      </div>
    );
  }

  private toggle = () => {
    this.props.setSideMenuToggle(this.props.identifier);
  };

  private updateCollapseMenuStatus = () => {
    const { childNavs, location } = this.props;
    let isCurrentURLinChildPresents: boolean = false;
    childNavs.forEach(childNav => {
      if (childNav.navURL === location.pathname) {
        isCurrentURLinChildPresents = true;
      }
    });
    if (isCurrentURLinChildPresents !== this.state.isCollapseMenuActive) {
      this.setState({ isCollapseMenuActive: isCurrentURLinChildPresents });
    }
  };
}

export default withRouter(SubMenu);
