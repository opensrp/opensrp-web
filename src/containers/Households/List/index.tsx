import reducerRegistry from '@onaio/redux-reducer-registry';
import { OpenSRPService } from '../../../services/opensrp';
import clientsReducer, {
  fetchHouseholds,
  Household,
  reducerName as clientsReducerName,
} from '../../../store/ducks/clients';
import './householdList.css';

/** register the clients reducer */
reducerRegistry.register(clientsReducerName, clientsReducer);

/** props Interface for the householdList component */
export interface HouseholdListProps {
  opensrpService: typeof OpenSRPService;
  householdsArray: Household[];
  fetchHouseholdsActionCreator: typeof fetchHouseholds;
}

/** default props for the householdList component */
export const defaultHouseholdListProps: HouseholdListProps = {
  fetchHouseholdsActionCreator: fetchHouseholds,
  householdsArray: [],
  opensrpService: OpenSRPService,
};
