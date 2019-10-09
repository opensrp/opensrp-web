import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import React, { Component } from 'react';
import { Route } from 'react-router';
import { ConnectedOauthCallback } from '@onaio/gatekeeper';
import Loading from '../components/page/Loading';
import { oAuthUserInfoGetter } from '../helpers/utils';
import { providers } from '../configs/settings';
import { LOGIN_URL } from '../constants';
import ConnectedHeader from '../containers/ConnectedHeader';
import { headerShouldNotRender } from '../helpers/utils';
import './App.css';

import ConnectedRoutes from './Routes';
import CustomOauthLogin from '../components/CustomAuthLogin';

library.add(faUser);

/** Main App component */
class App extends Component {
  public render() {
    return (
      <div className="main-app-container">
        {/* tslint:enable jsx-no-lambda */}
        <Route
          exact={true}
          path={LOGIN_URL}
          render={routeProps => <CustomOauthLogin providers={providers} {...routeProps} />}
        />
        <ConnectedHeader />
        {!headerShouldNotRender() && (
          <ConnectedRoutes />
        )}
      </div>
    );
  }
}

export default App;
