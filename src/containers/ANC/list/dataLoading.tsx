import { PromiseFn } from 'react-async';
import { OPENSRP_CLIENT_ENDPOINT } from '../../../configs/env';
import store from '../../../store';
import { Client, fetchClients } from '../../../store/ducks/clients';

/** Queries OpenSRP server for single page of anc records its arguments are
 * are de-structured from the options passed into the useAsync hook
 * @param {typeof OpenSRPService} service- the openSRP service
 * @param {any} filterParams - parametrize the get request
 * @param {AbortController} signal - used to abort promises
 */
export const loadANCList: PromiseFn<Client[]> = async ({ service, filterParams }, { signal }) => {
  const serve = new service(OPENSRP_CLIENT_ENDPOINT);
  return await serve.list(filterParams).then((response: Client[]) => {
    store.dispatch(fetchClients(response));
    return response;
  });
};
