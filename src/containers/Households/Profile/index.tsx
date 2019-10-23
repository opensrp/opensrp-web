import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Household } from '../../../store/ducks/clients';

/** interface for HouseholdProfile URL params */
interface HouseholdProfileURLParams {
  id: string;
}

/** interface for HouseholdProfileProps */
export interface HouseholdProfileProps extends RouteComponentProps<HouseholdProfileURLParams> {
  Household: Household;
}

class HouseholdProfile extends React.Component<HouseholdProfileProps> {
  public render() {
    const { match } = this.props;
    const householdId = match.params.id || '';
    return <div> Household Profile {householdId} </div>;
  }
}
const ConnectedHouseholdProfile = withRouter(HouseholdProfile);

export default ConnectedHouseholdProfile;
