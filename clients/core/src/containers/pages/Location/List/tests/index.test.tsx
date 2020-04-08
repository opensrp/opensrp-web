import * as React from 'react';
import { shallow } from 'enzyme';
import { LocationList, LocationListProps } from '..';
import * as fixtures from '../../../../../store/ducks/tests/fixtures';
import reducer, { reducerName } from '../../../../../store/ducks/adminLocation';
import reducerRegistry from '@onaio/redux-reducer-registry';

reducerRegistry.register(reducerName, reducer);

jest.mock('../../../../../configs/env');
describe('containers/child/List', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let classMock: any;
    beforeEach(() => {
        jest.resetAllMocks();

        const listMock = jest.fn(async () => {
            return { clients: fixtures.childList, total: 3 };
        });
        classMock = jest.fn(() => ({
            list: listMock,
        }));
    });

    it('renders without crashing', () => {
        const mock: jest.Mock = jest.fn();
        const props: LocationListProps = {
            locationArray: [],
            fetchLocation: mock,
            opensrpService: classMock,
            removeLocation: mock,
            totalRecords: 0,
            setTotalRecords: mock,
        };
        const wrapper = shallow(<LocationList {...props} />);
        expect(wrapper.length).toBe(1);
    });
});
