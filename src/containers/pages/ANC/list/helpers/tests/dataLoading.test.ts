import { OpenSRPService } from '../../../../../../services/opensrp';
import { fetchClients } from '../../../../../../store/ducks/clients';
import { allANC } from '../../tests/fixtures';
import { loadANCList } from '../dataLoading';

// tslint:disable-next-line: no-var-requires
const fetch = require('jest-fetch-mock');

jest.mock('../../../../../../configs/env');

const controller = new AbortController();
const signal = controller.signal;

describe('', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('loadANCList works correctly', () => {
    fetch.once(JSON.stringify(allANC));
    loadANCList({ service: OpenSRPService, filterParams: { pageSize: 50 } }, controller);
    expect(fetch.mock.calls).toEqual([
      [
        'https://test.smartregister.org/opensrp/rest/client/search?pageSize=50',
        {
          headers: {
            accept: 'application/json',
            authorization: 'Bearer null',
            'content-type': 'application/json;charset=UTF-8',
          },
          method: 'GET',
          signal,
        },
      ],
    ]);
  });

  it('dispatches action creator correctly', async () => {
    const mockActionCreator = jest.fn(args => fetchClients(args));
    fetch.once(JSON.stringify(allANC));

    loadANCList(
      { service: OpenSRPService, filterParams: { pageSize: 50 } },
      controller,
      mockActionCreator
    );

    await new Promise(resolve => setImmediate(resolve));
    expect(mockActionCreator).toHaveBeenCalled();
    expect(mockActionCreator.mock.calls).toEqual([[allANC]]);
  });
});
