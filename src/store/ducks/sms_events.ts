import { get, keyBy, keys, values } from 'lodash';
import { AnyAction, Store } from 'redux';

/** The reducer name */
export const reducerName = 'SmsReducer';

/** Interface for SMS record object as received from discover */
// tslint:disable-next-line: class-name
export interface SmsReducer {
  age: string;
  EventDate: string;
  event_id: string;
  health_worker_location_name: string;
  message: string;
  anc_id: string;
  logface_risk: string;
  health_worker_name: string;
  sms_type: string;
}

// actions

/** SMS_FETCHED action type */
export const FETCHED_SMS = 'opensrp/reducer/FETCHED_SMS';

/** interface for sms fetch */
// tslint:disable-next-line: class-name
export interface FetchSmsInterface extends AnyAction {
  payload: { [key: string]: SmsReducer };
  type: typeof FETCHED_SMS;
}

/** Create type for SMS reducer actions */
export type TestActionTypes = FetchSmsInterface | AnyAction;

// action Creators

/** Fetch SMS action creator
 * @param {Client []} clientsList - clients array to add to store
 * @return {FetchClientsAction} - an action to add clients to redux store
 */
export const fetchSms = (TrialData: SmsReducer[] = []): FetchSmsInterface => {
  const actionCreated = {
    payload: keyBy(TrialData, (trialObj: SmsReducer) => trialObj.event_id),
    type: FETCHED_SMS as typeof FETCHED_SMS,
  };
  //   console.log("gets called", actionCreated);
  return actionCreated;
};

// The reducer

/** interface for sms state in redux store */
// tslint:disable-next-line: class-name
interface smsStateReducer {
  payload: { [key: string]: SmsReducer };
}

/** initial sms-state state */
const initialState: smsStateReducer = {
  payload: {},
};

/** the sms reducer function */
export default function reducer(
  state: smsStateReducer = initialState,
  action: TestActionTypes
): smsStateReducer {
  switch (action.type) {
    case FETCHED_SMS:
      return {
        ...state,
        payload: action.payload,
      };
    default:
      return state;
  }
}

// // Selectors

/** returns all data in the store as values whose keys are their respective ids
 * @param {Partial<Store>} state - the redux store
 * @return { { [key: string] : Client} } - clients object as values, reepective ids as keys
 */
export function getTestData(state: Partial<Store>): SmsReducer[] {
  return values((state as any)[reducerName].payload);
}
