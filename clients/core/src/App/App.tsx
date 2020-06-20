import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faChartLine, faCog, faSearch } from '@fortawesome/free-solid-svg-icons';
import ConnectedPrivateRoute from '@onaio/connected-private-route';
import { ConnectedLogout, ConnectedOauthCallback, OauthLogin } from '@onaio/gatekeeper';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Col, Container, Row } from 'reactstrap';
import Loading from '../components/page/Loading';
import { DISABLE_LOGIN_PROTECTION } from '../configs/env';
import { sideMenuProps } from '../configs/navigationConfigs';
import { providers } from '../configs/settings';
import {
    LOGIN_URL,
    LOGOUT_URL,
    CHILD_URL,
    HOUSEHOLD_URL,
    HOUSEHOLD_PROFILE_URL,
    ANC_URL,
    CHILD_PROFILE_URL,
    TEAM_URL,
    TEAM_FORM_URL,
    TEAM_PROFILE_URL,
    LOCATIONS_URL,
    LOCATION_CREATE_URL,
    LOCATION_TAG_URL,
    LOCATION_TAG_CREATE_URL,
    CLIENT_PROFILE_URL,
    ANC_PROFILE_URL,
} from '../constants';
import ConnectedHeader from '../containers/ConnectedHeader';

import SideMenu from '../components/page/SideMenu';
import { CLIENT_URL } from '../constants';
import ConnectedClientList from '../containers/pages/Clients/List';
import ConnectedChildList from '../containers/pages/Child/List';
import ConnectedANCList from '../containers/pages/ANC/List';
import ConnectedLocationList from '../containers/pages/Location/List';
import LocationTagForm from '../components/page/LocationTagForm';
import Home from '../containers/pages/Home/Home';
import { oAuthUserInfoGetter } from '../helpers/utils';
import './App.css';
import ConnectedHouseholdList from '../containers/pages/Households/List';
import ConnectedHouseholdProfile from '../containers/pages/Households/Profile';
import ChildProfile from '../containers/pages/Child/Profile';
import ConnectedTeamList from '../containers/pages/Teams/List';
import ConnectedTeamProfile from '../containers/pages/Teams/Profile';
import { TeamForm } from '../components/page/Team/Form';
import { LocationForm } from '../components/page/Location/Form';
import ConnectedLocationTagList from '../containers/pages/LocationTag';
import ConnectedClientProfile from '../containers/pages/Clients/Profile';
import ConnectedANCProfile from '../containers/pages/ANC/Profile';

library.add(faUser, faChartLine, faCog, faSearch);

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
                                path={`${CHILD_PROFILE_URL}/:id`}
                                component={ChildProfile}
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
                                path={`${CLIENT_PROFILE_URL}/:id`}
                                component={ConnectedClientProfile}
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
                                path={`${ANC_PROFILE_URL}/:id`}
                                component={ConnectedANCProfile}
                            />

                            <ConnectedPrivateRoute
                                disableLoginProtection={DISABLE_LOGIN_PROTECTION}
                                exact={true}
                                path={`${HOUSEHOLD_PROFILE_URL}/:id`}
                                component={ConnectedHouseholdProfile}
                            />
                            <ConnectedPrivateRoute
                                disableLoginProtection={DISABLE_LOGIN_PROTECTION}
                                exact={true}
                                path={TEAM_URL}
                                component={ConnectedTeamList}
                            />
                            <ConnectedPrivateRoute
                                disableLoginProtection={DISABLE_LOGIN_PROTECTION}
                                exact={true}
                                path={`${TEAM_PROFILE_URL}/:id`}
                                component={ConnectedTeamProfile}
                            />
                            <ConnectedPrivateRoute
                                disableLoginProtection={DISABLE_LOGIN_PROTECTION}
                                exact={true}
                                path={TEAM_FORM_URL}
                                component={TeamForm}
                            />

                            <ConnectedPrivateRoute
                                disableLoginProtection={DISABLE_LOGIN_PROTECTION}
                                exact={true}
                                path={LOCATIONS_URL}
                                component={ConnectedLocationList}
                            />

                            <ConnectedPrivateRoute
                                disableLoginProtection={DISABLE_LOGIN_PROTECTION}
                                exact={true}
                                path={LOCATION_CREATE_URL}
                                component={LocationForm}
                            />

                            <ConnectedPrivateRoute
                                disableLoginProtection={DISABLE_LOGIN_PROTECTION}
                                exact={true}
                                path={LOCATION_TAG_URL}
                                component={ConnectedLocationTagList}
                            />

                            <ConnectedPrivateRoute
                                disableLoginProtection={DISABLE_LOGIN_PROTECTION}
                                exact={true}
                                path={LOCATION_TAG_CREATE_URL}
                                component={LocationTagForm}
                            />

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
