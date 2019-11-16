import { AnyAction, Store } from 'redux';
import { groupBy } from '../../helpers/utils';

/** The reducer name */
export const reducerName = 'SmsReducer';

/** Interface for SMS record object as received from discover */
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
  lmp_edd: any;
  parity: number;
  gravidity: number;
  location_id: string;
  client_type: string;
  child_symptoms: string;
  mother_symptoms: string;
}

export interface SmsDataByEventId {
  [key: string]: SmsData;
}

// actions

/** FETCH_SMS action type */
export const FETCHED_SMS = 'opensrp/reducer/FETCHED_SMS';
/** REMOVE_SMS action type */
export const REMOVE_SMS = 'opensrp/reducer/REMOVE_SMS';
/** ADD_FILTER_ARGS type */
export const ADD_FILTER_ARGS = 'opensrp/reducer/ADD_FILTER_ARGS';
/** REMOVE_FILTER_ARGS type */
export const REMOVE_FILTER_ARGS = 'opensrp/reducer/REMOVE_FILTER_ARGS';

/** interface for sms fetch */
export interface FetchSmsAction extends AnyAction {
  smsData: { [key: string]: SmsData };
  type: typeof FETCHED_SMS;
}

/** interface for Remove Sms action */
export interface RemoveSmsAction extends AnyAction {
  // tslint:disable-next-line: no-empty
  smsData: {};
  type: typeof REMOVE_SMS;
}

/** Interface for Remove  filter args action */
export interface RemoveFilterArgs extends AnyAction {
  filterArgs: null;
  type: typeof REMOVE_FILTER_ARGS;
}

/** Interface for AddFilterArgs */
export interface AddFilterArgsAction extends AnyAction {
  filterArgs: Array<(smsData: SmsData) => boolean>;
  type: typeof ADD_FILTER_ARGS;
}

/** Create type for SMS reducer actions */
export type SmsActionTypes =
  | FetchSmsAction
  | AddFilterArgsAction
  | RemoveSmsAction
  | RemoveFilterArgs
  | AnyAction;

// action Creators

/** Fetch SMS action creator
 * @param {SmsData[]} smsData - SmsData array to add to store
 * @return {FetchSmsAction} - an action to add SmsData to redux store
 */
export const fetchSms = (smsDataList: SmsData[] = []): FetchSmsAction => {
  return {
    smsData: groupBy(smsDataList, 'event_id'),
    type: FETCHED_SMS as typeof FETCHED_SMS,
  };
};

/** REMOVE SMS action */
export const removeSms: RemoveSmsAction = {
  smsData: {},
  type: REMOVE_SMS,
};

/** Add filter args action creator */
export const addFilterArgs = (
  filterArgs: Array<(smsData: SmsData) => boolean>
): AddFilterArgsAction => {
  return {
    filterArgs,
    type: ADD_FILTER_ARGS as typeof ADD_FILTER_ARGS,
  };
};

export const removeFilterArgs = (): RemoveFilterArgs => {
  return { filterArgs: null, type: REMOVE_FILTER_ARGS };
};
// The reducer

/** interface for sms state in redux store */
interface SmsState {
  smsData: { [key: string]: SmsData };
  smsDataFetched: boolean;
  filterArgs: Array<(smsData: SmsData) => boolean> | null;
}

/** initial sms-state state */
const initialState: SmsState = {
  filterArgs: null,
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
    case ADD_FILTER_ARGS:
      return {
        ...state,
        filterArgs: [...(state.filterArgs ? state.filterArgs : []), ...action.filterArgs],
      };
    case REMOVE_FILTER_ARGS:
      return {
        ...state,
        filterArgs: action.filterArgs,
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
  return Object.values((state as any)[reducerName].smsData);
}

/** returns true if sms data has been fetched from superset and false
 * if the data has not been fetched
 */
export function smsDataFetched(state: Partial<Store>): boolean {
  return (state as any)[reducerName].smsDataFetched;
}

/**
 * Returns a list of SmsData that has been filtered based on the value
 * of a field specified.
 * @param {Partil<Store>} state - the state of the SmsReducer redux store
 * @param {field} string - the name of the field to filter by
 * @param {value} string | number - the string or number value of the field specified
 */
export function getFilteredSmsData(
  state: Partial<Store>,
  filterArgs: Array<(smsData: SmsData) => boolean>
): SmsData[] {
  // in the future we may have to modify this selector to receive more than one FilterArgs object
  // i.e an array of these objects and then each one of them, one after another to do the filtering
  let results = Object.keys((state as any)[reducerName].smsData).map(
    (key: string) => (state as any)[reducerName].smsData[key]
  );

  // would have used Object.values but according to
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values
  // its still not stabilized

  for (const filterArgsIndex in filterArgs) {
    if (filterArgsIndex) {
      results = results.filter(filterArgs[0]);
    }
  }
  return results;
}

/** Returns the filterArgs currently in the store */
export function getFilterArgs(state: Partial<Store>): Array<(smsData: SmsData) => boolean> {
  if ((state as any)[reducerName].filterArgs) {
    return (state as any)[reducerName].filterArgs;
  } else {
    return [];
  }
}
