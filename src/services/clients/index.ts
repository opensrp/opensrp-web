import { OPENSRP_BASE_API_ENDPOINT, OPENSRP_CLIENT_ENDPOINT } from '../../configs/env';

class ClientService {
  private CLIENTS_API_ENDPOINT = `${OPENSRP_BASE_API_ENDPOINT}/${OPENSRP_CLIENT_ENDPOINT}/search`;

  public async getClientsList() {
    interface Response {
      data: any;
      error: string;
    }
    let result: Response | null = null;

    await fetch(this.CLIENTS_API_ENDPOINT, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
      },
      method: 'GET',
    })
      .then(async response => {
        result = {
          data: await response.json(),
          error: (!!response.ok && `${response.status} Failed to retrieve clients list`) || '',
        };
      })
      .catch(err => {
        result = {
          data: [],
          error: err,
        };
      });

    return result;
  }
}

export default new ClientService();
