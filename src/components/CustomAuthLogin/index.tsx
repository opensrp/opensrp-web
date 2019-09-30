import { ProviderLinks, Providers } from '@onaio/gatekeeper';
import React from 'react';
import './index.css';

/** interface for OauthLogin props */
export interface OauthLoginProps {
  ProviderLinksComponent?: React.ElementType;
  providers: Providers;
}

/** This component provides the Oauth login page - it simply presents a list of
 * links of oAuth providers.
 */
const CustomOauthLogin = (props: OauthLoginProps) => {
  const { providers, ProviderLinksComponent } = props;
  return ProviderLinksComponent && providers ? (
    <div className="login container-fluid">
      <div className="row">
        <div className="col-6">
          <img src={require('./../../assets/images/child-hero.png')} alt="" className="child" />
        </div>
        <div className="col-6">
          <div className="logo">
            <img
              src={require('./../../assets/images/vietnam-moh.png')}
              alt="unicef vietnam"
              className="moh"
            />
            <img
              src={require('./../../assets/images/uni-vietnam.png')}
              alt="unicef vietnam"
              className="unicef"
            />
          </div>
          <div className="center">
            <ProviderLinksComponent {...{ providers }} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="gatekeeper-login">
      <p className="gatekeeper-p">No providers</p>
    </div>
  );
};

CustomOauthLogin.defaultProps = {
  ProviderLinksComponent: ProviderLinks /** use the ProviderLinks component as the default */,
};

export default CustomOauthLogin;
