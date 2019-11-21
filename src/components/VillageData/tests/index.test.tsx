import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import VillageData, { Props } from '..';
import store from '../../../store/index';
import villageDataProps from './villageDataPropsfixtures';

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
          <VillageData {...(villageDataProps as Props)} />
        </Router>
      </Provider>
    );
    expect(toJson(wrapper.find('tr'))).toMatchSnapshot('VillageData with data');
  });
});

describe('components/VillageData/nbcAndPncMotherMapFunction', () => {
  it('must return the correct value given specific input', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <VillageData {...(villageDataProps as Props)} />
        </Router>
      </Provider>
    );
    const instance = wrapper.find('VillageData').instance() as VillageData;
    expect(instance.nbcAndPncMotherMapFunction(villageDataProps.smsData[0])).toMatchSnapshot(
      'nbcAndPncMotherMapFuctionOutput'
    );
  });
});

describe('components/VillageData/nbcAndPncChildMapFunction', () => {
  it('must return the correct value given specific input', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <VillageData {...(villageDataProps as Props)} />
        </Router>
      </Provider>
    );
    const instance = wrapper.find('VillageData').instance() as VillageData;
    expect(instance.nbcAndPncChildMapFunction(villageDataProps.smsData[1])).toMatchSnapshot(
      'nbcAndPncChildMapFunctionOutput'
    );
  });
});

describe('components/VillageData/pregnancyMapFunction', () => {
  it('must return the correct value given specific input', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <VillageData {...(villageDataProps as Props)} />
        </Router>
      </Provider>
    );
    const instance = wrapper.find('VillageData').instance() as VillageData;
    expect(instance.pregnancyMapFunction(villageDataProps.smsData[2])).toMatchSnapshot(
      'pregnancyMapFunctionOutput'
    );
  });
});
