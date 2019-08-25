import { get, keyBy, keys, values } from 'lodash';
import { AnyAction, Store } from 'redux';
import SeamlessImmutable from 'seamless-immutable';
import { FlexObject } from '../../helpers/utils';

/** The reducer name */
export const reducerName = 'households';

/** Interface for household object as received from clientServices. Used Client instead of Household */
export interface Household {
  type: 'Client';
  dateCreated: number;
  serverVersion: number;
  clientApplicationVersion: number;
  clientDatabaseVersion: number;
  baseEntityId: string;
  identifiers: { [key: string]: string | null };
  addresses: FlexObject[];
  attributes: FlexObject;
  firstName: string;
  lastName: string;
  birthdate: number;
  middleName?: string;
  birthdateApprox: boolean;
  deathdateApprox: boolean;
  gender?: string;
  relationships: {
    [key: string]: string[];
  };
  _id: string;
  _rev: string;
}
