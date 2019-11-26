import { OPENSRP_CLIENT_ENDPOINT } from '../../../configs/env';
import { OpenSRPService } from '../../../services/opensrp';
import store from '../../../store';
import { Client } from '../../../store/ducks/clients';

/** Queries opensrp server for single page of anc records
 * @param {typeof OpenSRPService} service -  the OpenSRP service
 */
export const loadANCList = async (
  { service }: any,
  { signal }: AbortController
): Promise<Client[]> => {
  const serve = new service(OPENSRP_CLIENT_ENDPOINT);
  const filterParams = {};
  return await serve.list(filterParams);
};
