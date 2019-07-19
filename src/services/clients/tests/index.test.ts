import ClientService from '../';
import { FAILED_TO_RETRIEVE_CLIENTS } from '../../../constants';

import * as fixtures from '../../../store/ducks/tests/fixtures';

// tslint:disable-next-line: no-var-requires
const fetch = require('jest-fetch-mock');
jest.mock('../../../configs/env');

describe('services/clients', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    fetch.resetMocks();
  });

  it('should return data for ok response status data', async () => {
    const data = [fixtures.rawClient1];
    fetch.once(JSON.stringify(data));

    const responseData = await ClientService.getClientsList();
    expect(fetch.mock.calls.length).toEqual(1);
    expect(responseData).toEqual({
      data,
      error: {
        apiErrorMessage: '',
        error: null,
        serviceErrorMessage: '',
      },
    });
    expect(fetch.mock.calls[0][0]).toEqual('https://someip/rest/client/search');
  });

  it('should handle different types of http errors', async () => {
    fetch.once('{}', { status: 500 });
    const responseData = await ClientService.getClientsList();
    const expected = {
      data: [],
      error: {
        apiErrorMessage: '',
        error: null,
        serviceErrorMessage: `${'500'} ${FAILED_TO_RETRIEVE_CLIENTS}`,
      },
    };
    expect(responseData).toEqual(expected);
  });

  it('should handle different types of http errors', async () => {
    const toReturn = {
      error: 'unauthorized',
      error_description: 'An Authentication object was not found in the SecurityContext',
    };
    fetch.once(JSON.stringify(toReturn), { status: 401 });
    const responseData = await ClientService.getClientsList();
    const expected = {
      data: [],
      error: {
        apiErrorMessage: 'An Authentication object was not found in the SecurityContext',
        error: 'unauthorized',
        serviceErrorMessage: `${'401'} ${FAILED_TO_RETRIEVE_CLIENTS}`,
      },
    };
    expect(responseData).toEqual(expected);
  });
});
