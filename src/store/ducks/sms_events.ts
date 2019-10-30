import { get, keyBy, keys, values } from 'lodash';
import { AnyAction, Store } from 'redux';

/** The reducer name */
export const reducerName = 'SmsReducer';

/** Interface for SMS record object as received from discover */
// tslint:disable-next-line: class-name
export interface SmsData {
  age: string;
  EventDate: string;
  event_id: string;
  health_worker_location_name: string;
  message: string | number;
  anc_id: string;
  logface_risk: string;
  health_worker_name: string;
  sms_type: string;
  height: number;
  weight: number;
  previous_risks: string;
  lmp_edd: number;
  parity: number;
  gravidity: number;
  location_id: string;
}

// actions

/** fETCH_SMS action type */
export const FETCHED_SMS = 'opensrp/reducer/FETCHED_SMS';
/** REMOVE_SMS action type */
export const REMOVE_SMS = 'opensrp/reducer/REMOVE_SMS';

/** interface for sms fetch */
// tslint:disable-next-line: class-name
export interface FetchSmsAction extends AnyAction {
  smsData: { [key: string]: SmsData };
  type: typeof FETCHED_SMS;
}

/** Create type for SMS reducer actions */
export type SmsActionTypes = FetchSmsAction | AnyAction;

// action Creators

/** Fetch SMS action creator
 * @param {SmsData[]} smsData - SmsData array to add to store
 * @return {FetchSmsAction} - an action to add SmsData to redux store
 */
export const fetchSms = (smsDataList: SmsData[] = []): FetchSmsAction => {
  const actionCreated = {
    smsData: keyBy(smsDataList, (smsData: SmsData) => smsData.event_id),
    type: FETCHED_SMS as typeof FETCHED_SMS,
  };
  return actionCreated;
};

export const removeSms = {
  smsDataById: {},
  type: REMOVE_SMS,
};
// The reducer

/** interface for sms state in redux store */
// tslint:disable-next-line: class-name
interface SmsState {
  smsData: { [key: string]: SmsData };
  smsDataFetched: boolean;
}

/** initial sms-state state */
const initialState: SmsState = {
  smsData: {},
  smsDataFetched: false,
};

/** the sms reducer function */
export default function reducer(state: SmsState = initialState, action: SmsActionTypes): SmsState {
  switch (action.type) {
    case FETCHED_SMS:
      return {
        ...state,
        smsData: { ...state.smsData, ...action.smsData },
        smsDataFetched: true,
      };
    case REMOVE_SMS:
      return {
        ...state,
        smsData: action.smsData,
        smsDataFetched: false,
      };
    default:
      return state;
  }
}

// // Selectors

/** returns all data in the store as values whose keys are their respective ids
 * @param {Partial<Store>} state - the redux store
 * @return { { [key: string] : SmsData}[] } - SmsData object[] as values, respective ids as keys
 */
export function getSmsData(state: Partial<Store>): SmsData[] {
  return values((state as any)[reducerName].smsData);
}

/** returns true if sms data has been fetched from superset and false
 * if the data has not been fetched
 */
export function smsDataFetched(state: Partial<Store>): boolean {
  return (state as any)[reducerName].smsDataFetched;
}
