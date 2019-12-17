import { PromiseFn } from 'react-async';
import { OPENSRP_CLIENT_ENDPOINT } from '../../../../configs/env';
import store from '../../../../store';
import { Client, fetchClients } from '../../../../store/ducks/clients';

/** Queries OpenSRP server for single page of anc records its arguments are
 * are de-structured from the options passed into the useAsync hook
 * @param {typeof OpenSRPService} service- the openSRP service
 * @param {FlexObject} filterParams - parametrize the get request
 * @param {AbortController} signal - used to abort promises
 * @param {typeof fetchClients} - action creator
 */
export const loadANCList: PromiseFn<Client[]> = async (
  { service, filterParams },
  { signal }: AbortController,
  fetchClientsCreator: typeof fetchClients = fetchClients
) => {
  const serve = new service(OPENSRP_CLIENT_ENDPOINT);
  return await serve.list(filterParams).then((response: Client[]) => {
    store.dispatch(fetchClientsCreator(response));
    return response;
  });
};
