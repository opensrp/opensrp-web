import { OPENSRP_CLIENT_ENDPOINT } from '../../configs/env';

class ClientService {
  private CLIENTS_API_ENDPOINT = `${OPENSRP_CLIENT_ENDPOINT}/search`;
}

export default new ClientService();
