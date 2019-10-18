import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { ENABLE_REPORT_MODULE } from '../../../configs/env';
import {
  ENABLE_ANC_PAGE,
  ENABLE_CHILD_PAGE,
  ENABLE_CLIENT_PAGE,
  ENABLE_HOUSEHOLD_PAGE,
  ENABLE_LOCATION_PAGE,
  ENABLE_NEWBORN_AND_POSTNATAL_MODULE,
  ENABLE_NUTRITION_MODULE,
  ENABLE_PREGNANCY_MODULE,
  ENABLE_ROLE_PAGE,
  ENABLE_TEAM_PAGE,
  ENABLE_USER_PAGE,
} from '../../../configs/env';
import {
  ADMIN,
  ALL_CLIENTS,
  ANALYSIS,
  ANALYSIS_URL,
  ANC,
  ANC_URL,
  CHILD,
  CHILD_URL,
  CLIENT_RECORDS,
  CLIENT_URL,
  COMPARTMENTS,
  COMPARTMENTS_URL,
  HOME,
  HOME_URL,
  HOUSEHOLD,
  HOUSEHOLD_URL,
  LOCATIONS,
  LOCATIONS_URL,
  LOGFACE,
  LOGFACE_URL,
  NEWBORN_AND_POSTNATAL,
  NEWBORN_AND_POSTNATAL_URL,
  NUTRITION,
  NUTRITION_URL,
  PREGNANCY,
  PREGNANCY_URL,
  REPORTS,
  REPORTS_URL,
  ROLE_URL,
  ROLES,
  TEAM_URL,
  TEAMS,
  USER_URL,
  USERS,
} from '../../../constants';
import SubMenu, { ModulePageLink, NavigationModule, PageLink, SubMenuProps } from './SubMenu';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  ADMIN_NAVIGATION_MODULE,
  CLIENT_NAVIGATION_MODULE,
  ENABLE_ADMIN_MODULE,
  ENABLE_CLIENT_RECORDS_MODULE,
  HOME_NAVIGATION_MODULE,
  PREGNANCY_NAVIGATION_MODULE,
  REPORT_NAVIGATION_MODULE,
} from './constants';
import './index.css';

/** interface for the local state for this component
 * @property {string} collapsedModuleLabel - label pointing to active navigation module
 */
export interface SideMenuState {
  collapsedModuleLabel: string;
}

const defaultSideMenuState: SideMenuState = {
  collapsedModuleLabel: '',
};

class SideMenu extends React.Component<RouteComponentProps, SideMenuState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = defaultSideMenuState;
  }

  public render() {
    const collapsedModuleLabel = this.state.collapsedModuleLabel;
    interface SubMenuToRender {
      shouldRender: boolean;
      subMenuProps: Partial<SubMenuProps>;
    }
    const navigationModules: SubMenuToRender[] = [
      { shouldRender: true, subMenuProps: HOME_NAVIGATION_MODULE },
      { shouldRender: ENABLE_PREGNANCY_MODULE, subMenuProps: PREGNANCY_NAVIGATION_MODULE },
      { shouldRender: ENABLE_REPORT_MODULE, subMenuProps: REPORT_NAVIGATION_MODULE },
      { shouldRender: ENABLE_CLIENT_RECORDS_MODULE, subMenuProps: CLIENT_NAVIGATION_MODULE },
      { shouldRender: ENABLE_ADMIN_MODULE, subMenuProps: ADMIN_NAVIGATION_MODULE },
    ];
    return (
      <div className="side-menu-container">
        <Row>
          <Col className="side-menu-extend">
            {navigationModules.map((navigationModule: any) => {
              if (navigationModule.shouldRender) {
                return (
                  <SubMenu
                    childNavs={navigationModule.subMenuProps.childNavs}
                    collapsedModuleLabel={collapsedModuleLabel}
                    setCollapsedModuleLabel={this.setCollapsedModuleLabel}
                    parentNav={navigationModule.subMenuProps.parentNav}
                  />
                );
              }
            })}
          </Col>
        </Row>
      </div>
    );
  }

  /** updates collapsedModuleLabel to label of the new navigation module that should be collapsed */
  private setCollapsedModuleLabel = (label: string) => {
    this.setState({
      collapsedModuleLabel: label,
    });
  };
}

const connectedSideMenu = withRouter((props: RouteComponentProps) => <SideMenu {...props} />);

export default connectedSideMenu;
