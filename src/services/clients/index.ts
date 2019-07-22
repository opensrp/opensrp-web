import { OPENSRP_BASE_API_ENDPOINT, OPENSRP_CLIENT_ENDPOINT } from '../../configs/env';
import {
  FAILED_TO_RETRIEVE_CLIENTS,
  SERVICE_HEADERS,
  UNKNOWN_API_ERROR_MESSAGE,
  UNKNOWN_ERROR,
} from '../../constants';
import { formatResponse } from '../../helpers/utils';
import { Client } from '../../store/ducks/clients';

/** interface for error property in case of error
 * due to http error codes in service response
 */
interface HTTPError {
  type: string;
  apiErrorMessage: string;
  serviceErrorMessage: string;
  occurred: true;
}

/** interface for  error property in case of any other cause of error */
interface OtherError {
  type: string;
  serviceErrorMessage: string;
  occurred: true;
}

/** interface for error object if there was no error that occurred */
interface NoError {
  occurred: false;
}

/** interface for the service response */
interface ServiceResponse {
  data: Client[];
  error: HTTPError | OtherError | NoError;
}

class ClientService {
  private CLIENTS_API_ENDPOINT = `${OPENSRP_BASE_API_ENDPOINT}/${OPENSRP_CLIENT_ENDPOINT}/search`;

  public getClientsList() {
    let serviceResponse: ServiceResponse | null = null;
    fetch(this.CLIENTS_API_ENDPOINT, { headers: { ...SERVICE_HEADERS }, method: 'GET' })
      .then(async response => {
        serviceResponse = formatResponse(response);
      })
      .catch(err => {
        serviceResponse = formatResponse(err);
      });

    return serviceResponse;
  }
}

export default new ClientService();
