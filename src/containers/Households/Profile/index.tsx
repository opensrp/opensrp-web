import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { OpenSRPService } from '../../../services/opensrp';
import { fetchClient, fetchEvents, fetchMembers } from '../../../store/ducks/client';
import { Household } from '../../../store/ducks/clients';

/** interface for HouseholdProfile URL params */
interface HouseholdProfileURLParams {
  id: string;
}

/** interface for HouseholdProfileProps */
export interface HouseholdProfileProps extends RouteComponentProps<HouseholdProfileURLParams> {
  household: Household;
  event: Event;
  members: Household[];
  fetchClientActionCreator: typeof fetchClient;
  fetchMembersActionCreator: typeof fetchMembers;
  fetchEventsActionCreator: typeof fetchEvents;
  opensrpService: typeof OpenSRPService;
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
