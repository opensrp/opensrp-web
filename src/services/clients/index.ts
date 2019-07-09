import { OPENSRP_API_ENDPOINT } from '../../configs/settings';

class ClientService {
  public async getClientsList(url = `${OPENSRP_API_ENDPOINT}/clients`) {
    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
      },
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`${response.status} Failed to retrieve clients list`);
    }

    const { data } = await response.json();

    return { data };
  }
}
