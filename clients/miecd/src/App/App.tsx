import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft, faChartLine, faCog, faHome } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';
import { Route } from 'react-router';
import { providers } from '../configs/settings';
import { LOGIN_URL } from '../constants';
import ConnectedHeader from '../containers/ConnectedHeader';
import { headerShouldNotRender } from '../helpers/utils';
import './App.css';

import CustomOauthLogin from '../components/CustomAuthLogin';
import ConnectedRoutes from './Routes';

library.add(faUser, faChartLine, faCog, faHome, faArrowLeft);
/** Main App component */
class App extends Component {
    public render() {
        return (
            <div className="main-app-container">
                {/* tslint:enable jsx-no-lambda */}
                <Route
                    exact={true}
                    path={LOGIN_URL}
                    // tslint:disable-next-line: jsx-no-lambda
                    render={routeProps => <CustomOauthLogin providers={providers} {...routeProps} />}
                />
                {/* tslint:enable jsx-no-lambda */}
                <ConnectedHeader />
                {!headerShouldNotRender() && <ConnectedRoutes />}
            </div>
        );
    }
}

export default App;
