import { OPENSRP_BASE_API_ENDPOINT, OPENSRP_CLIENT_ENDPOINT } from '../../configs/env';
import { FAILED_TO_RETRIEVE_CLIENTS, SERVICE_HEADERS } from '../../constants';
import { Client } from '../../store/ducks/clients';

interface ApiErrorResponse {
  error: string;
  error_description: string;
}

interface ServiceResponse {
  data: Client[];
  error: {
    serviceErrorMessage: string;
    error: string | null;
    apiErrorMessage: string;
  };
}

class ClientService {
  private CLIENTS_API_ENDPOINT = `${OPENSRP_BASE_API_ENDPOINT}/${OPENSRP_CLIENT_ENDPOINT}/search`;

  public async getClientsList() {
    let result: ServiceResponse | null = null;

    await fetch(this.CLIENTS_API_ENDPOINT, { headers: { ...SERVICE_HEADERS }, method: 'GET' })
      .then(async response => {
        const returnObj = await response.json();
        result = this.formatResponse(returnObj);
      })
      .catch(err => this.formatResponse(err));

    return result;
  }

  /**
   * @param {ApiErrorResponse | Client []} apiResponse - response from a resolved api promise call.
   */
  private formatResponse = (apiResponse: ApiErrorResponse | Client[]): ServiceResponse => {
    // used to format the response object
    let serviceResponse: ServiceResponse;
    if (Array.isArray(apiResponse)) {
      serviceResponse = {
        data: apiResponse,
        error: {
          apiErrorMessage: '',
          error: null,
          serviceErrorMessage: '',
        },
      };
    } else {
      serviceResponse = {
        data: [],
        error: {
          apiErrorMessage: apiResponse.error_description || 'Unknown Api Error Description',
          error: apiResponse.error || 'Unknown Error',
          serviceErrorMessage: `${(apiResponse as any).status} ${FAILED_TO_RETRIEVE_CLIENTS}`,
        },
      };
    }
    return serviceResponse;
  };
}

export default new ClientService();
