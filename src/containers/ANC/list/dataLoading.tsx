import { OPENSRP_CLIENT_ENDPOINT } from '../../../configs/env';
import { OpenSRPService } from '../../../services/opensrp';
import store from '../../../store';
import { Client, fetchClients } from '../../../store/ducks/clients';

/** Queries OpenSRP server for single page of anc records
 * @param {typeof OpenSRPService} service -  the OpenSRP service
 * @param {typeof } fetchClientsCreator -  the action creator
 */
export const loadANCList = async ({ service }: any, { signal }: any) => {
  const serve = new service(OPENSRP_CLIENT_ENDPOINT);
  const filterParams = {};
  return await serve.list(filterParams).then((response: Client[]) => {
    store.dispatch(fetchClients(response));
    return response;
  });
};
