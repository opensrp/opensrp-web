import { OPENSRP_BASE_API_ENDPOINT, OPENSRP_CLIENT_ENDPOINT } from '../../configs/env';
import { FAILED_TO_RETRIEVE_CLIENTS, SERVICE_HEADERS } from '../../constants';

class ClientService {
  private CLIENTS_API_ENDPOINT = `${OPENSRP_BASE_API_ENDPOINT}/${OPENSRP_CLIENT_ENDPOINT}/search`;

  public async getClientsList() {
    interface Response {
      data: any;
      error: string;
    }
    let result: Response | null = null;

    await fetch(this.CLIENTS_API_ENDPOINT, { headers: { ...SERVICE_HEADERS }, method: 'GET' })
      .then(async response => {
        const returnObj = await response.json();
        let data: Array<{ [key: string]: any }> = returnObj;
        // check that the returned data is an array, if there was an
        // error this will usually comeback as an object
        if (!Array.isArray(returnObj)) {
          data = [];
        }
        result = {
          data,
          error: (!response.ok && `${response.status} ${FAILED_TO_RETRIEVE_CLIENTS}`) || '',
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
