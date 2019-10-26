import { ProviderLinks, Providers } from '@onaio/gatekeeper';
import React from 'react';
import { MIECD_VIETNAM, NO_PROVIDERS } from '../../constants';
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
    <div className="row login-row">
      <div className="image col-lg col-xl" />
      <div className="col-lg col-xl login-section">
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
          <h3>{MIECD_VIETNAM}</h3>
          <ProviderLinksComponent {...{ providers }} />
        </div>
      </div>
    </div>
  ) : (
    <div className="gatekeeper-login">
      <p className="gatekeeper-p">{NO_PROVIDERS}</p>
    </div>
  );
};

CustomOauthLogin.defaultProps = {
  ProviderLinksComponent: ProviderLinks /** use the ProviderLinks component as the default */,
};

export default CustomOauthLogin;
