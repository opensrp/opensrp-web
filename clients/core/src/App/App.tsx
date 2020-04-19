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
import { LOGIN_URL, LOGOUT_URL, CHILD_URL } from '../constants';
import ConnectedHeader from '../containers/ConnectedHeader';

import SideMenu from '../components/page/SideMenu';
import { CLIENT_URL } from '../constants';
import ConnectedClientList from '../containers/pages/Clients/List';
import ConnectedChildList from '../containers/pages/Child/List';
import Home from '../containers/pages/Home/Home';
import { oAuthUserInfoGetter } from '../helpers/utils';
import './App.css';
import { LocationForm } from '../containers/pages/Location/Form';

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
                                path={CLIENT_URL}
                                component={ConnectedClientList}
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
                                path={`/location-form`}
                                component={LocationForm}
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
