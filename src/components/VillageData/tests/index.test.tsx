import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import VillageData, { Props } from '..';
import store from '../../../store/index';
import VillageDataProps from './villageDataPropsfixtures';

const history = createBrowserHistory();

describe('components/VillageData', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('must render without crashing', () => {
    shallow(<VillageData />);
  });

  it('must render correctly with no data', () => {
    const wrapper = mount(<VillageData />);
    expect(toJson(wrapper)).toMatchSnapshot('Village data with no data');
  });

  it('must render correctly with data', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <VillageData {...(VillageDataProps as Props)} />
        </Router>
      </Provider>
    );
    expect(toJson(wrapper.find('tr'))).toMatchSnapshot('VillageData with data');
  });
});
