import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import ConnectedPrivateRoute from '@onaio/connected-private-route';
import { ConnectedLogout, ConnectedOauthCallback } from '@onaio/gatekeeper';
import { getUser, isAuthenticated, logOutUser } from '@onaio/session-reducer';
import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { Store } from 'redux';

import { Route, Switch, RouteComponentProps, withRouter, match } from 'react-router';
import Loading from '../components/page/Loading';
import { DISABLE_LOGIN_PROTECTION } from '../configs/env';
import { providers } from '../configs/settings';
import { LOGFACE_URL, LOGOUT_URL } from '../constants';
import './App.css';
import { CLIENT_URL } from '../constants';
import ConnectedClientList from '../containers/Clients/List';
import ConnectedLogFace from '../containers/LogFace';
import Home from '../containers/pages/Home/Home';
import SidenavComponent from '../components/page/SideNav/sidenav';
import PregnancyHome from '../containers/pages/Home/PregnancyHome';
import { oAuthUserInfoGetter } from '../helpers/utils';
import { exportSpecifier } from '@babel/types';
import { HeaderProps } from '../components/page/Header/Header';

library.add(faUser);

const mapStateToProps = (state: Partial<Store>) => {
  return {
    authenticated: isAuthenticated(state)
  };
};

export interface RoutesProps {
  authenticated: boolean;
}

const XXX = (props: any) => {
  console.log("here")
  return <div>xxxxxxxxxxxxxxxxxxxxxx</div>;
}

export const Routes = (props: RoutesProps) => {
  const { authenticated } = props;
  return (
    <div className={`${authenticated ? 'main-container' : ''}`}>
      <div className={`${authenticated ? 'sidebar' : 'hidden-container'}`}>
        <SidenavComponent />
      </div>
      <div className="content">
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
          path="/pregnancy"
          component={PregnancyHome}
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
          path={LOGOUT_URL}
          component={ConnectedLogout}
        />
        <ConnectedPrivateRoute
          exact={true}
          path={LOGFACE_URL}
          component={ConnectedLogFace}
        />
        {/* tslint:disable jsx-no-lambda */}
        <Route
            exact={true}
            path="/oauth/callback/:id"
            render={routeProps => (
              <ConnectedOauthCallback
                LoadingComponent={Loading}
                providers={providers}
                oAuthUserInfoGetter={oAuthUserInfoGetter}
                SuccessfulLoginComponent={Home}
                {...routeProps}
              />
            )}
          />
          {/* tslint:enable jsx-no-lambda */}
      </Switch>
    </div>
    </div>
  ); 
}

// class Routes extends Component<{}, {}> {

//   public render() {
//     console.log("props??", this.props);
//     //const { authenticated } = this.props;
//     debugger;
//     // if (!authenticated) {
//     //   return null;
//     // }
//     return (
//       <div className="main-container">
//         <div className="sidebar">
//           <SidenavComponent />
//         </div>
//         <div className="content">
//         <Switch>
//           <ConnectedPrivateRoute
//             disableLoginProtection={DISABLE_LOGIN_PROTECTION}
//             exact={true}
//             path="/"
//             component={Home}
//           />
//           <ConnectedPrivateRoute
//             disableLoginProtection={DISABLE_LOGIN_PROTECTION}
//             exact={true}
//             path="/pregnancy"
//             component={PregnancyHome}
//           />
//           <ConnectedPrivateRoute
//             disableLoginProtection={DISABLE_LOGIN_PROTECTION}
//             exact={true}
//             path={CLIENT_URL}
//             component={ConnectedClientList}
//           />

//           {/* tslint:disable jsx-no-lambda */}
//           <Route
//             exact={true}
//             path="/oauth/callback/:id"
//             render={routeProps => (
//               <ConnectedOauthCallback
//                 LoadingComponent={Loading}
//                 providers={providers}
//                 oAuthUserInfoGetter={oAuthUserInfoGetter}
//                 {...routeProps}
//               />
//             )}
//           />
//           {/* tslint:enable jsx-no-lambda */}
//           <ConnectedPrivateRoute
//             disableLoginProtection={DISABLE_LOGIN_PROTECTION}
//             exact={true}
//             path={LOGOUT_URL}
//             component={ConnectedLogout}
//           />
//           <ConnectedPrivateRoute
//             exact={true}
//             path={LOGFACE_URL}
//             component={ConnectedLogFace}
//           />
//         </Switch>
//       </div>
//       </div>
//     );
//   }
// }

const ConnectedRoutes = connect(mapStateToProps)(Routes);

export default ConnectedRoutes;