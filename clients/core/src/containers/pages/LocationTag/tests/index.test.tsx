import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { LocationTagList, LocationtagProps } from '..';
import ConnectedChildList from '..';
import * as fixtures from '../../../../store/ducks/tests/fixtures';
import { Provider } from 'react-redux';
import store from '../../../../store';
import reducer, { fetchLocationTags, reducerName, removeLocationTags } from '../../../../store/ducks/locationTag';
import reducerRegistry from '@onaio/redux-reducer-registry';
import { MemoryRouter } from 'react-router';

reducerRegistry.register(reducerName, reducer);

jest.mock('../../../../configs/env');
describe('containers/child/List', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let classMock: any;
    beforeEach(() => {
        jest.resetAllMocks();

        const listMock = jest.fn(async () => {
            return fixtures.locationTagList;
        });
        classMock = jest.fn(() => ({
            list: listMock,
        }));
    });

    it('renders without crashing', () => {
        const props: LocationtagProps = {
            locationTagArray: [],
            fetchLocationTags: fetchLocationTags,
            removeLocationTags: removeLocationTags,
            service: classMock,
        };
        const wrapper = shallow(<LocationTagList {...props} />);
        expect(wrapper.length).toBe(1);
    });

    it('works correctly with the redux store', () => {
        store.dispatch(fetchLocationTags(fixtures.locationTagList));
        const props: LocationtagProps = {
            locationTagArray: [],
            fetchLocationTags: fetchLocationTags,
            removeLocationTags: removeLocationTags,
            service: classMock,
        };
        const wrapper = mount(
            <Provider store={store}>
                <ConnectedChildList {...props} />
                );
            </Provider>,
        );
        const foundProps = wrapper.find('LocationTagList').props() as LocationtagProps;
        expect(foundProps.locationTagArray).toEqual(fixtures.locationTagList);
        wrapper.unmount();
    });

    it(' should update the props after server call', async () => {
        const props: LocationtagProps = {
            locationTagArray: [],
            fetchLocationTags: fetchLocationTags,
            removeLocationTags: removeLocationTags,
            service: classMock,
        };
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']} keyLength={0}>
                    <ConnectedChildList {...props} />
                </MemoryRouter>
            </Provider>,
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await new Promise((resolve: any) => setImmediate(resolve));
        wrapper.update();

        const foundProps = wrapper.find('LocationTagList').props() as LocationtagProps;
        expect(foundProps.locationTagArray.length as number).toBe(fixtures.locationTagList.length);
        wrapper.unmount();
    });
});
