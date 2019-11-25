import * as React from 'react';
import { Col, Row } from 'reactstrap';
import './index.css';
import SubMenu, { NavigationModule } from './SubMenu';

/** interface for object with aggregated information
 * on all navigation modules
 */
export interface AggregatedNavigationModule {
  /** Whether to display this navigation module */
  enabled: boolean;
  /** The navigation Module- includes what the parent navigation is
   * and what the child navigations that are nested under the parent
   * navigation are
   */
  module: NavigationModule;
}

/** interface for SideMenu component */
export interface SideMenuProps {
  /** An array of all the aggregatedNavigationModule - will include
   * all navigationModules whether enabled or disabled
   */
  navigationModules: AggregatedNavigationModule[];
}

/** default props for the sideMenu component */
const defaultSideMenuProps: SideMenuProps = {
  navigationModules: [],
};

/** interface for the local state for this component
 */
interface SideMenuState {
  /** label pointing to active navigation module */
  collapsedModuleLabel: string | null;
}

/** default state for SideMenu */
const defaultSideMenuState: SideMenuState = {
  collapsedModuleLabel: null,
};

/** SideMenu component */
class SideMenu extends React.Component<SideMenuProps, SideMenuState> {
  public static defaultProps = defaultSideMenuProps;
  constructor(props: SideMenuProps) {
    super(props);
    this.state = defaultSideMenuState;
  }

  public render() {
    const collapsedModuleLabel = this.state.collapsedModuleLabel;

    return (
      <div className="side-menu-container">
        <Row>
          <Col className="side-menu-extend">
            {this.props.navigationModules.map(({ enabled, module }, index) => {
              const props = {
                ...module,
                collapsedModuleLabel,
                setCollapsedModuleLabel: this.setCollapsedModuleLabel,
              };
              return enabled && <SubMenu key={index} {...props} />;
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

export default SideMenu;
