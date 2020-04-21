import { getOnadataUserInfo, getOpenSRPUserInfo } from '@onaio/gatekeeper';
import { SessionState } from '@onaio/session-reducer';
import { ONADATA_OAUTH_STATE, OPENSRP_OAUTH_STATE } from '../configs/env';

/** Interface for an object that is allowed to have any property */
export interface FlexObject {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

/** Custom function to get oAuth user info depending on the oAuth2 provider
 * It compares the value of the `state` param in the oAuth2 provider config
 * to the one received from the oAuth2 provider in order to return the correct
 * user info getter function
 * @param {{[key: string]: any }} apiResponse - the API response object
 */
export function oAuthUserInfoGetter(apiResponse: FlexObject): SessionState | void {
    if (Object.keys(apiResponse).includes('oAuth2Data')) {
        switch (apiResponse.oAuth2Data.state) {
            case OPENSRP_OAUTH_STATE:
                return getOpenSRPUserInfo(apiResponse);
            case ONADATA_OAUTH_STATE:
                return getOnadataUserInfo(apiResponse);
        }
    }
}

export function readableDate(date: number | string): string {
    const d = new Date(date);
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return `${month} ${day}, ${year}`;
}
export function calculateAge(dob: number) {
    const date = new Date(dob);
    return Math.abs(date.getUTCFullYear() - new Date().getFullYear());
}

/**
 *
 * @param startDate = yyyy-MM-DD
 * @param endDate = yyyy-MM-DD
 */
export function countDaysBetweenDate(startDate: number, endDate: number) {
    const timeDiff = (new Date(endDate) as any) - (new Date(startDate) as any);
    return timeDiff / (1000 * 60 * 60 * 24);
}
