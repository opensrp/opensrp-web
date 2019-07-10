import ClientService from '../';

import * as fixtures from '../tests/fixtures';

// tslint:disable-next-line: no-var-requires
const fetch = require('jest-fetch-mock');

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
    expect(responseData).toEqual({ data, error: '' });
    expect(fetch.mock.calls[0][0]).toEqual(
      'https://reveal-stage.smartregister.org/opensrp/rest/client/search'
    );
  });

  it('should handle different types of http errors', async () => {
    fetch.once('[]', { status: 500 });
    const responseData = await ClientService.getClientsList();
    const expected = {
      data: [],
      error: `${'500'} Failed to retrieve clients list`,
    };
    expect(responseData).toEqual(expected);
  });
});
