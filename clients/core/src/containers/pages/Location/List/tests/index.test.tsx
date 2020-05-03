import * as React from 'react';
import { shallow, mount } from 'enzyme';
import ConnectedLocationList, { LocationList, LocationListProps } from '..';
import * as fixtures from '../../../../../store/ducks/tests/fixtures';
import reducer, {
    reducerName,
    fetchLocationList,
    removeLocationList,
    setTotalRecords,
} from '../../../../../store/ducks/adminLocation';
import reducerRegistry from '@onaio/redux-reducer-registry';
import store from '../../../../../store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

reducerRegistry.register(reducerName, reducer);

jest.mock('../../../../../configs/env');
describe('containers/location/List', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let classMock: any;
    beforeEach(() => {
        jest.resetAllMocks();

        const listMock = jest.fn(async () => {
            return { locations: fixtures.locations, total: fixtures.locations.length };
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

    it('should update the props after server call', async () => {
        const props: LocationListProps = {
            opensrpService: classMock,
            locationArray: [],
            fetchLocation: fetchLocationList,
            removeLocation: removeLocationList,
            setTotalRecords: setTotalRecords,
            totalRecords: 0,
        };
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']} keyLength={0}>
                    <ConnectedLocationList {...props} />
                </MemoryRouter>
            </Provider>,
        );
        await new Promise((resolve) => setImmediate(resolve));
        wrapper.update();
        expect(wrapper.find('LocationTable').length).toBe(1);
        wrapper.unmount();
    });
});
