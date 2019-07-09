import { OPENSRP_BASE_API_ENDPOINT, OPENSRP_CLIENT_ENDPOINT } from '../../configs/env';

class ClientService {
  private CLIENTS_API_ENDPOINT = `${OPENSRP_BASE_API_ENDPOINT}/${OPENSRP_CLIENT_ENDPOINT}/search`;

  public async getClientsList() {
    const response = await fetch(this.CLIENTS_API_ENDPOINT, {
      headers: {
        Accept: 'application/json',
      },
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`${response.status} Failed to retrieve clients list`);
    }

    const data = await response.json();

    return { data };
  }
}

export default new ClientService();
