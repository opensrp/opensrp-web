import * as React from 'react';
import { mount } from 'enzyme';
import { ChildList, ChildListProps } from '..';
import ConnectedChildList from '..';
import * as fixtures from '../../../../store/ducks/tests/fixtures';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import store from '../../../../store';
import { fetchChildList } from '../../../../store/ducks/child';

describe('containers/child/List', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('renders without crashing', () => {
        const wrapper = mount(<ChildList />);
        expect(wrapper.length).toBe(1);
    });

    it('renders correctly', () => {
        const mock: jest.Mock = jest.fn();
        const opensrpServiceMock: jest.Mock = jest.fn();
        const props: ChildListProps = {
            childArray: [],
            fetchChild: mock,
            opensrpService: opensrpServiceMock,
            removeChild: mock,
            totalRecords: 0,
            setTotalRecords: mock,
        };
        const wrapper = mount(<ChildList {...props} />);
        expect(toJson(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });

    it('renders correctly when childArray is an empty array', () => {
        const mock: jest.Mock = jest.fn();
        const opensrpServiceMock: jest.Mock = jest.fn();
        const props: ChildListProps = {
            childArray: [],
            fetchChild: mock,
            opensrpService: opensrpServiceMock,
            removeChild: mock,
            totalRecords: 0,
            setTotalRecords: mock,
        };
        const wrapper = mount(<ChildList {...props} />);
        expect(toJson(wrapper.find('Ripple'))).toMatchSnapshot('Ripple Loader');
        wrapper.unmount();
    });

    it('works correctly with the redux store', () => {
        store.dispatch(fetchChildList(fixtures.childList));
        const mock: jest.Mock = jest.fn();
        const opensrpServiceMock: jest.Mock = jest.fn();
        const props: ChildListProps = {
            childArray: [],
            fetchChild: mock,
            opensrpService: opensrpServiceMock,
            removeChild: mock,
            totalRecords: 0,
            setTotalRecords: mock,
        };
        const wrapper = mount(
            <Provider store={store}>
                <ConnectedChildList {...props} />
                );
            </Provider>,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });
});
