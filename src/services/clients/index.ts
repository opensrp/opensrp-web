import { OPENSRP_CLIENT_ENDPOINT } from '../../configs/env';
import { OpenSRPService } from '../../services/opensrp';

class ClientService {
  private CLIENTS_API_ENDPOINT = `${OPENSRP_CLIENT_ENDPOINT}/search`;

  public async getClientsList() {
    const opensrpService = new OpenSRPService(this.CLIENTS_API_ENDPOINT);
    return await opensrpService.list();
  }
}

export default new ClientService();
