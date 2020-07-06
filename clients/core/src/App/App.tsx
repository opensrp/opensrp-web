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
    VIEW_RELEASE_PAGE_URL,
    VIEW_JSON_VALIDATORS_PAGE_URL,
    MANIFEST_FILE_UPLOAD,
    VIEW_DRAFT_FILES_PAGE_URL,
    SERVER_SETTINGS_URL,
} from '../constants';
import ConnectedHeader from '../containers/ConnectedHeader';

import SideMenu from '../components/page/SideMenu';
import { CLIENT_URL } from '../constants';
import ConnectedClientList from '../containers/pages/Clients/List';
import ConnectedChildList from '../containers/pages/Child/List';
import Home from '../containers/pages/Home/Home';
import { oAuthUserInfoGetter } from '../helpers/utils';
import './App.css';
import { ManifestReleasesPage } from '../containers/pages/FormConfig/manifest/releases';
import { ManifestFiles } from '../containers/pages/FormConfig/manifest/filesList';
import { JSONValidatorListPage } from '../containers/pages/FormConfig/JSONValidators';
import { UploadConfigFilePage } from '../containers/pages/FormConfig/manifest/uploadFile';
import { ManifestDraftFilesPage } from '../containers/pages/FormConfig/manifest/draftFiles';
import { EditServerSettings } from '../containers/pages/ServerSettings/EditSettings';

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
                                path={VIEW_RELEASE_PAGE_URL}
                                component={ManifestReleasesPage}
                            />
                            <ConnectedPrivateRoute
                                disableLoginProtection={DISABLE_LOGIN_PROTECTION}
                                exact={true}
                                path={`${VIEW_RELEASE_PAGE_URL}/:id`}
                                component={ManifestFiles}
                            />
                            <ConnectedPrivateRoute
                                disableLoginProtection={DISABLE_LOGIN_PROTECTION}
                                exact={true}
                                path={VIEW_JSON_VALIDATORS_PAGE_URL}
                                component={JSONValidatorListPage}
                            />
                            <ConnectedPrivateRoute
                                disableLoginProtection={DISABLE_LOGIN_PROTECTION}
                                exact={true}
                                path={`${MANIFEST_FILE_UPLOAD}/:type`}
                                component={UploadConfigFilePage}
                            />
                            <ConnectedPrivateRoute
                                disableLoginProtection={DISABLE_LOGIN_PROTECTION}
                                exact={true}
                                path={`${MANIFEST_FILE_UPLOAD}/:type/:id`}
                                component={UploadConfigFilePage}
                            />
                            <ConnectedPrivateRoute
                                disableLoginProtection={DISABLE_LOGIN_PROTECTION}
                                exact={true}
                                path={VIEW_DRAFT_FILES_PAGE_URL}
                                component={ManifestDraftFilesPage}
                            />
                            <ConnectedPrivateRoute
                                disableLoginProtection={DISABLE_LOGIN_PROTECTION}
                                exact={true}
                                path={SERVER_SETTINGS_URL}
                                component={EditServerSettings}
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
