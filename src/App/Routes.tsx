import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import ConnectedPrivateRoute from '@onaio/connected-private-route';
import { ConnectedLogout, ConnectedOauthCallback, LogoutProps } from '@onaio/gatekeeper';
import { isAuthenticated } from '@onaio/session-reducer';
import React from 'react';
import { connect } from 'react-redux';
import { Store } from 'redux';

import { Route, RouteComponentProps, Switch } from 'react-router';
import { LastLocationProvider } from 'react-router-last-location';
import Loading from '../components/page/Loading';
import SideMenu from '../components/page/SideMenu';
import {
  NBC_AND_PNC_ANALYSIS_ENDPOINT,
  OPENSRP_LOGOUT_URL,
  SUPERSET_PREGNANCY_ANALYSIS_ENDPOINT,
} from '../configs/env';
import { providers } from '../configs/settings';
import {
  CHILD_PATIENT_DETAIL_URL,
  HIERARCHICAL_DATA_URL,
  LOGOUT_URL,
  NBC_AND_PNC,
  NBC_AND_PNC_ANALYSIS_URL,
  NBC_AND_PNC_COMPARTMENTS_URL,
  NBC_AND_PNC_DASHBOARD_WELCOME,
  NBC_AND_PNC_LOGFACE_URL,
  NBC_AND_PNC_URL,
  NEWBORN_REPORT,
  NUTRITION,
  NUTRITION_ANALYSIS_URL,
  NUTRITION_COMPARTMENTS_URL,
  NUTRITION_DASHBOARD_WELCOME,
  NUTRITION_LOGFACE_URL,
  NUTRITION_REGISTRATION,
  NUTRITION_REPORT,
  NUTRITION_URL,
  PATIENT_DETAIL_URL,
  PREGNANCY,
  PREGNANCY_ANALYSIS_URL,
  PREGNANCY_COMPARTMENTS_URL,
  PREGNANCY_DASHBOARD_WELCOME,
  PREGNANCY_DESCRIPTION,
  PREGNANCY_LOGFACE_URL,
  PREGNANCY_REGISTRATION,
  SMS_FILTER_FUNCTION,
} from '../constants';
import { PREGNANCY_URL } from '../constants';
import ConnectedChildPatientDetails from '../containers/ChildPatientDetails';
import Compartments from '../containers/Compartments';
import ConnectedHierarchichalDataTable from '../containers/HierarchichalDataTable';
import ConnectedLogFace from '../containers/LogFace';
import Analysis from '../containers/pages/Analysis';
import Home from '../containers/pages/Home';
import ModuleHome from '../containers/pages/ModuleHome';
import ConnectedPatientDetails from '../containers/PatientDetails';
import { headerShouldNotRender, oAuthUserInfoGetter } from '../helpers/utils';
import { SmsData } from '../store/ducks/sms_events';
import './App.css';

library.add(faUser);

const mapStateToProps = (state: Partial<Store>) => {
  return {
    authenticated: isAuthenticated(state),
  };
};

export interface RoutesProps {
  authenticated: boolean;
}

export const Routes = (props: RoutesProps) => {
  const { authenticated } = props;
  return (
    <div
      className={`${
        authenticated && !headerShouldNotRender() ? 'main-container' : 'hidden-container'
      }`}
    >
      <SideMenu authenticated={authenticated} />
      <div className="content">
        <Switch>
          <LastLocationProvider>
            <ConnectedPrivateRoute
              disableLoginProtection={false}
              exact={true}
              path="/"
              component={Home}
            />
            <ConnectedPrivateRoute
              disableLoginProtection={false}
              exact={true}
              path={PREGNANCY_URL}
              // tslint:disable-next-line: jsx-no-lambda
              component={() => (
                <ModuleHome
                  title={PREGNANCY_DASHBOARD_WELCOME}
                  description={PREGNANCY_DESCRIPTION}
                  logFaceUrl={PREGNANCY_LOGFACE_URL}
                  compartmentUrl={PREGNANCY_COMPARTMENTS_URL}
                  analysisUrl={PREGNANCY_ANALYSIS_URL}
                />
              )}
            />
            <ConnectedPrivateRoute
              disableLoginProtection={false}
              exact={true}
              path={NBC_AND_PNC_URL}
              // tslint:disable-next-line: jsx-no-lambda
              component={() => (
                <ModuleHome
                  title={NBC_AND_PNC_DASHBOARD_WELCOME}
                  description={PREGNANCY_DESCRIPTION}
                  logFaceUrl={NBC_AND_PNC_LOGFACE_URL}
                  compartmentUrl={NBC_AND_PNC_COMPARTMENTS_URL}
                  analysisUrl={NBC_AND_PNC_ANALYSIS_URL}
                />
              )}
            />
            <ConnectedPrivateRoute
              disableLoginProtection={false}
              exact={true}
              path={NUTRITION_URL}
              // tslint:disable-next-line: jsx-no-lambda
              component={() => (
                <ModuleHome
                  title={NUTRITION_DASHBOARD_WELCOME}
                  description={PREGNANCY_DESCRIPTION}
                  logFaceUrl={NUTRITION_LOGFACE_URL}
                  compartmentUrl={NUTRITION_COMPARTMENTS_URL}
                  analysisUrl={NUTRITION_ANALYSIS_URL}
                />
              )}
            />
            <ConnectedPrivateRoute
              disableLoginProtection={false}
              exact={true}
              path={PREGNANCY_COMPARTMENTS_URL}
              // tslint:disable-next-line: jsx-no-lambda
              component={() => (
                <Compartments
                  filterArgs={
                    [
                      (smsData: SmsData) => {
                        return smsData.sms_type === PREGNANCY_REGISTRATION;
                      },
                    ] as SMS_FILTER_FUNCTION[]
                  }
                  module={PREGNANCY}
                />
              )}
            />
            <ConnectedPrivateRoute
              disableLoginProtection={false}
              exact={true}
              path={NBC_AND_PNC_COMPARTMENTS_URL}
              // tslint:disable-next-line: jsx-no-lambda
              component={() => (
                <Compartments
                  filterArgs={
                    [
                      (smsData: SmsData) => {
                        return smsData.sms_type === NEWBORN_REPORT;
                      },
                    ] as SMS_FILTER_FUNCTION[]
                  }
                  module={NBC_AND_PNC}
                />
              )}
            />
            <ConnectedPrivateRoute
              disableLoginProtection={false}
              exact={true}
              path={NUTRITION_COMPARTMENTS_URL}
              // tslint:disable-next-line: jsx-no-lambda
              component={() => (
                <Compartments
                  filterArgs={
                    [
                      (smsData: SmsData) => {
                        return (
                          smsData.sms_type === NUTRITION_REPORT ||
                          smsData.sms_type === NUTRITION_REGISTRATION
                        );
                      },
                    ] as SMS_FILTER_FUNCTION[]
                  }
                  module={NUTRITION}
                />
              )}
            />
            <ConnectedPrivateRoute
              disableLoginProtection={false}
              exact={true}
              path={(() => {
                return [
                  NUTRITION_COMPARTMENTS_URL,
                  NBC_AND_PNC_COMPARTMENTS_URL,
                  PREGNANCY_COMPARTMENTS_URL,
                ].map(
                  url =>
                    `${url}${HIERARCHICAL_DATA_URL}/:module?/:risk_highlighter?/:title?/:current_level?/:direction?/:node_id?/:permission_level?/:from_level?`
                );
              })()}
              component={ConnectedHierarchichalDataTable}
            />
            <ConnectedPrivateRoute
              disableLoginProtection={false}
              exact={true}
              path={PREGNANCY_ANALYSIS_URL}
              // tslint:disable-next-line: jsx-no-lambda
              component={() => (
                <Analysis endpoint={SUPERSET_PREGNANCY_ANALYSIS_ENDPOINT} module={PREGNANCY} />
              )}
            />
            <ConnectedPrivateRoute
              disableLoginProtection={false}
              exact={true}
              path={NBC_AND_PNC_ANALYSIS_URL}
              // tslint:disable-next-line: jsx-no-lambda
              component={() => (
                <Analysis endpoint={NBC_AND_PNC_ANALYSIS_ENDPOINT} module={NBC_AND_PNC} />
              )}
            />
            <ConnectedPrivateRoute
              disableLoginProtection={false}
              exact={true}
              path={NUTRITION_ANALYSIS_URL}
              // tslint:disable-next-line: jsx-no-lambda
              component={() => (
                <Analysis endpoint={SUPERSET_PREGNANCY_ANALYSIS_ENDPOINT} module={NUTRITION} />
              )}
            />
            <ConnectedPrivateRoute
              disableLoginProtection={false}
              exact={true}
              path={(() => {
                return [
                  NUTRITION_COMPARTMENTS_URL,
                  NBC_AND_PNC_COMPARTMENTS_URL,
                  PREGNANCY_COMPARTMENTS_URL,
                ].map(url => `${url}${PATIENT_DETAIL_URL}`);
              })()}
              component={ConnectedPatientDetails}
            />
            <ConnectedPrivateRoute
              disableLoginProtection={false}
              exact={true}
              path={(() => {
                return [
                  NUTRITION_COMPARTMENTS_URL,
                  NBC_AND_PNC_COMPARTMENTS_URL,
                  PREGNANCY_COMPARTMENTS_URL,
                ].map(url => `${url}${CHILD_PATIENT_DETAIL_URL}`);
              })()}
              // tslint:disable-next-line: jsx-no-lambda
              component={(routeProps: any) => (
                <ConnectedPatientDetails isNutrition={true} {...routeProps} />
              )}
            />
            <ConnectedPrivateRoute
              disableLoginProtection={false}
              exact={true}
              path={(() => {
                return [NUTRITION_LOGFACE_URL, NBC_AND_PNC_LOGFACE_URL, PREGNANCY_LOGFACE_URL].map(
                  url => `${url}${PATIENT_DETAIL_URL}`
                );
              })()}
              component={ConnectedPatientDetails}
            />
            <ConnectedPrivateRoute
              disableLoginProtection={false}
              exact={true}
              path={(() => {
                return [NUTRITION_LOGFACE_URL, NBC_AND_PNC_LOGFACE_URL, PREGNANCY_LOGFACE_URL].map(
                  url => `${url}${CHILD_PATIENT_DETAIL_URL}`
                );
              })()}
              // tslint:disable-next-line: jsx-no-lambda
              component={(routeProps: any) => (
                <ConnectedPatientDetails isNutrition={true} {...routeProps} />
              )}
            />
            <ConnectedPrivateRoute
              disableLoginProtection={false}
              exact={true}
              path={LOGOUT_URL}
              // tslint:disable-next-line: jsx-no-lambda
              component={() => (
                <ConnectedLogout {...({ logoutURL: OPENSRP_LOGOUT_URL } as Partial<LogoutProps>)} />
              )}
            />

            <ConnectedPrivateRoute
              exact={false}
              path={PREGNANCY_LOGFACE_URL}
              // tslint:disable-next-line: jsx-no-lambda
              component={() => <ConnectedLogFace module={PREGNANCY} />}
            />
            <ConnectedPrivateRoute
              exact={false}
              path={NBC_AND_PNC_LOGFACE_URL}
              // tslint:disable-next-line: jsx-no-lambda
              component={() => <ConnectedLogFace module={NBC_AND_PNC} />}
            />
            <ConnectedPrivateRoute
              exact={false}
              path={NUTRITION_LOGFACE_URL}
              // tslint:disable-next-line: jsx-no-lambda
              component={() => <ConnectedLogFace module={NUTRITION} />}
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
          </LastLocationProvider>
        </Switch>
      </div>
    </div>
  );
};

const ConnectedRoutes = connect(mapStateToProps)(Routes);

export default ConnectedRoutes;
