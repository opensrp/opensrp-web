import { mount, shallow } from 'enzyme';
import { createBrowserHistory } from 'history';
import _ from 'lodash';
import React from 'react';
import { Router } from 'react-router';
import { SearchBar } from '../searchBar';

const actualDebounce = _.debounce;
const customDebounce = (callback: any) => callback;
_.debounce = customDebounce;

const history = createBrowserHistory();

jest.useFakeTimers();

describe('src/components/SearchForm', () => {
    afterAll(() => {
        _.debounce = actualDebounce;
    });

    it('renders without crashing', () => {
        const props = {
            onChangeHandler: jest.fn(),
            placeholder: 'Random string',
        };
        shallow(<SearchBar {...props} />);
    });
    it('renders correctly', () => {
        const props = {
            onChangeHandler: jest.fn(),
            placeholder: 'Random string',
        };
        const wrapper = mount(<SearchBar {...props} />);
        expect(wrapper.find('.search-input-wrapper').length).toEqual(1);
        expect(wrapper.find('FontAwesomeIcon').length).toEqual(1);
        wrapper.unmount();
    });

    it('handles submit correctly when provided changeHandler', () => {
        const onChangeHandlerMock = jest.fn();
        const props = {
            onChangeHandler: onChangeHandlerMock,
            placeholder: '',
        };
        const wrapper = mount(
            <Router history={history}>
                <SearchBar {...props} />
            </Router>,
        );

        wrapper.find('input').simulate('input', { target: { value: 'test' } });

        expect(onChangeHandlerMock.mock.calls[0][0].target.value).toEqual('test');
        wrapper.unmount();
    });
});
