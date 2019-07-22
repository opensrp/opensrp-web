import { getOnadataUserInfo, getOpenSRPUserInfo } from '@onaio/gatekeeper';
import { SessionState } from '@onaio/session-reducer';
import { ONADATA_OAUTH_STATE, OPENSRP_OAUTH_STATE } from '../configs/env';
import { FAILED_TO_RETRIEVE_CLIENTS } from '../constants';
import { Client } from '../store/ducks/clients';

/** Interface for an object that is allowed to have any property */
export interface FlexObject {
  [key: string]: any;
}

/** Custom function to get oAuth user info depending on the oAuth2 provider
 * It compares the value of the `state` param in the oAuth2 provider config
 * to the one received from the oAuth2 provider in order to return the correct
 * user info getter function
 * @param {{[key: string]: any }} apiResponse - the API response object
 */
export function oAuthUserInfoGetter(apiResponse: { [key: string]: any }): SessionState | void {
  if (Object.keys(apiResponse).includes('oAuth2Data')) {
    switch (apiResponse.oAuth2Data.state) {
      case OPENSRP_OAUTH_STATE:
        return getOpenSRPUserInfo(apiResponse);
      case ONADATA_OAUTH_STATE:
        return getOnadataUserInfo(apiResponse);
    }
  }
}

/** interface for error property in case of error
 * due to http error codes in service response
 *
 */
interface HTTPError {
  type: string;
  apiErrorMessage: string;
  serviceErrorMessage: string;
  occurred: true;
}

/** interface for  error property in case of any other cause of error */
interface OtherError {
  type: string;
  serviceErrorMessage: string;
  occurred: true;
}

/** interface for error object if there was no error that occurred */
interface NoError {
  occurred: false;
}

/** interface for the service response */
export interface ServiceResponse {
  data: Client[];
  error: HTTPError | OtherError | NoError;
}

/** DIRTY HACK -> need to investigate how to set the type of a response object from fetch */
export function formatResponse(responseObj: any): ServiceResponse {
  // Initialization assumes that the the fetch Call was successful
  let serviceResponse: ServiceResponse = {
    data: setData(responseObj),
    error: {
      occurred: false,
    },
  };

  // define error structure for api erred response and for any other response error
  if (responseObj.ok === false) {
    // i think means http error
    const error: HTTPError = {
      apiErrorMessage: setApiErrorMessage(responseObj),
      occurred: true,
      serviceErrorMessage: setServiceErrorMessage(responseObj),
      type: 'HTTP error',
    };
    serviceResponse = {
      data: setData(responseObj),
      error,
    };
  }

  if (responseObj.ok === undefined) {
    // means idk a network error; a system error, the fetch call did not get to the api
    const error: OtherError = {
      occurred: true,
      serviceErrorMessage: setServiceErrorMessage(responseObj),
      type: responseObj.name,
    };
    serviceResponse = {
      data: setData(responseObj),
      error,
    };
  }
  return serviceResponse;
}

/**
 * returns a string used as the apiErrorMessage in the serviceResponse object
 * @param responseObj - response obj from fetch api call
 */
function setApiErrorMessage(responseObj: any): string {
  return `HTTP Error: (${responseObj.status})`;
}

/**
 * returns a string used as the serviceErrorMessage in the serviceResponse obj
 */
function setServiceErrorMessage(responseObj: any, message: string = ''): string {
  return `${responseObj.status} ${FAILED_TO_RETRIEVE_CLIENTS}`;
}

/**
 * Define the slice of data that is of interest from the fetch's call response data
 */
function setData(responseObj: any): Client[] {
  console.log(responseObj);
  const returnedData = responseObj.then((response: any) => response.json());
  if (Array.isArray(returnedData)) {
    return returnedData;
  } else {
    return [];
  }
}
