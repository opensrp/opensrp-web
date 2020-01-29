import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft, faChartLine, faCog, faSearch } from '@fortawesome/free-solid-svg-icons';
import ConnectedPrivateRoute from '@onaio/connected-private-route';
import { ConnectedLogout, ConnectedOauthCallback, OauthLogin } from '@onaio/gatekeeper';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Col, Container, Row } from 'reactstrap';
import Loading from '../components/page/Loading';
import { DISABLE_LOGIN_PROTECTION } from '../configs/env';
import { sideMenuProps } from '../configs/navigationConfigs';
import { providers } from '../configs/settings';
import { HOUSEHOLD_PROFILE_URL, HOUSEHOLD_URL, LOGIN_URL, LOGOUT_URL, CHILD_URL, ANC_URL } from '../constants';
import ConnectedHeader from '../containers/ConnectedHeader';

import SideMenu from '../components/page/SideMenu';
import { CLIENT_URL } from '../constants';
import ConnectedClientList from '../containers/Clients/List';
import ConnectedHouseholdList from '../containers/Households/List';
import ConnectedHouseholdProfile from '../containers/Households/Profile';
import Home from '../containers/pages/Home/Home';
import { oAuthUserInfoGetter } from '../helpers/utils';
import './App.css';
import ConnectedChildList from '../containers/Child/List';
import ConnectedANCList from '../containers/ANC/List';

library.add(faUser, faChartLine, faCog, faSearch, faArrowLeft);

/** Main App component */
class App extends Component {
  public render() {
    return (
      <Container fluid={true}>
        <ConnectedHeader />
        <Row id="main-page-row">
          <Col md={2} className="side-menu-section">
            <SideMenu {...sideMenuProps} />
          </Col>
          <Col md={10} className="container-section">
            <Switch>
              <ConnectedPrivateRoute
                disableLoginProtection={DISABLE_LOGIN_PROTECTION}
                exact={true}
                path="/"
                component={Home}
              />
              <ConnectedPrivateRoute
                disableLoginProtection={DISABLE_LOGIN_PROTECTION}
                exact={true}
                path={CLIENT_URL}
                component={ConnectedClientList}
              />
              <ConnectedPrivateRoute
                disableLoginProtection={DISABLE_LOGIN_PROTECTION}
                exact={true}
                path={HOUSEHOLD_URL}
                component={ConnectedHouseholdList}
              />
              <ConnectedPrivateRoute
                disableLoginProtection={DISABLE_LOGIN_PROTECTION}
                exact={true}
                path={CHILD_URL}
                component={ConnectedChildList}
              />
              <ConnectedPrivateRoute
                disableLoginProtection={DISABLE_LOGIN_PROTECTION}
                exact={true}
                path={ANC_URL}
                component={ConnectedANCList}
              />
              <ConnectedPrivateRoute
                disableLoginProtection={DISABLE_LOGIN_PROTECTION}
                exact={true}
                path={`${HOUSEHOLD_PROFILE_URL}/:id`}
                component={ConnectedHouseholdProfile}
              />
              {/* tslint:disable jsx-no-lambda */}
              <Route
                exact={true}
                path={LOGIN_URL}
                render={routeProps => <OauthLogin providers={providers} {...routeProps} />}
              />
              <Route
                exact={true}
                path="/oauth/callback/:id"
                render={routeProps => (
                  <ConnectedOauthCallback
                    LoadingComponent={Loading}
                    providers={providers}
                    oAuthUserInfoGetter={oAuthUserInfoGetter}
                    {...routeProps}
                  />
                )}
              />
              {/* tslint:enable jsx-no-lambda */}
              <ConnectedPrivateRoute
                disableLoginProtection={DISABLE_LOGIN_PROTECTION}
                exact={true}
                path={LOGOUT_URL}
                component={ConnectedLogout}
              />
            </Switch>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
