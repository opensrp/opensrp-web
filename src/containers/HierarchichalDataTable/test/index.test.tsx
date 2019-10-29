import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import ConnectedHierarchichalDataTable from '..';
import { fetchLocations } from '../../../store/ducks/locations';
import { fetchSms } from '../../../store/ducks/sms_events';
import store from '../../../store/index';
import { smsSlice } from '../../LogFace/tests/fixtures';
import { communes, districts, provinces, villages } from './fixtures';

jest.genMockFromModule('@fortawesome/react-fontawesome');
jest.mock('@fortawesome/react-fontawesome');

const history = createBrowserHistory();

describe('HierarchichalDataTable', () => {
  it('renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <ConnectedHierarchichalDataTable />
      </Provider>
    );
  });

  it('renders correctly', () => {
    store.dispatch(fetchLocations(districts));
    store.dispatch(fetchLocations(provinces));
    store.dispatch(fetchLocations(communes));
    store.dispatch(fetchLocations(villages));
    store.dispatch(fetchSms(smsSlice));

    let props = {
      match: {
        params: {
          risk_highlighter: 'high_risk',
          title: 'Total Pregnancies',
        },
      },
    };

    let wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedHierarchichalDataTable {...props} />
        </Router>
      </Provider>
    );
    expect(toJson(wrapper.find('Table'))).toMatchSnapshot('hierarchichalDataTable');

    props = {
      match: {
        params: {
          current_level: 1,
          direction: 'down',
          node_id: '1',
          risk_highlighter: 'high_risk',
          title: 'Total Pregnancies',
        } as any,
      },
    };

    // pass props in the partern /:risk_highlighter?/:title?/:current_level?/:direction?/:node_id?/:from_level?
    //             hierarchicaldata/high-risk/156 Total Pregnancies/1/down/1
    wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedHierarchichalDataTable {...props} />
        </Router>
      </Provider>
    );
    expect(toJson(wrapper.find('tbody'))).toMatchSnapshot('hierarchichalDataTable');

    props = {
      match: {
        params: {
          current_level: 2,
          direction: 'down',
          node_id: '6',
          risk_highlighter: 'high_risk',
          title: 'Total Pregnancies',
        } as any,
      },
    };
    wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedHierarchichalDataTable {...props} />
        </Router>
      </Provider>
    );
    expect(toJson(wrapper.find('tbody'))).toMatchSnapshot('hierarchichalDataTable');

    props = {
      match: {
        params: {
          current_level: 3,
          direction: 'down',
          node_id: '13',
          risk_highlighter: 'high_risk',
          title: 'Total Pregnancies',
        } as any,
      },
    };
    wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedHierarchichalDataTable {...props} />
        </Router>
      </Provider>
    );
    expect(toJson(wrapper.find('tbody'))).toMatchSnapshot('hierarchichalDataTable');

    props = {
      match: {
        params: {
          current_level: 2,
          direction: 'up',
          from_level: 3,
          node_id: '13',
          risk_highlighter: 'high_risk',
          title: 'Total Pregnancies',
        } as any,
      },
    };
    wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedHierarchichalDataTable {...props} />
        </Router>
      </Provider>
    );
    expect(toJson(wrapper.find('tbody'))).toMatchSnapshot('hierarchichalDataTable');

    props = {
      match: {
        params: {
          current_level: 1,
          direction: 'up',
          from_level: 3,
          node_id: '13',
          risk_highlighter: 'high_risk',
          title: 'Total Pregnancies',
        } as any,
      },
    };
    wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedHierarchichalDataTable {...props} />
        </Router>
      </Provider>
    );
    expect(toJson(wrapper.find('tbody'))).toMatchSnapshot('hierarchichalDataTable');

    props = {
      match: {
        params: {
          current_level: 0,
          direction: 'up',
          from_level: 3,
          node_id: '13',
          risk_highlighter: 'high_risk',
          title: 'Total Pregnancies',
        } as any,
      },
    };
    wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedHierarchichalDataTable {...props} />
        </Router>
      </Provider>
    );
    expect(toJson(wrapper.find('tbody'))).toMatchSnapshot('hierarchichalDataTable');

    props = {
      match: {
        params: {
          current_level: 1,
          direction: 'up',
          from_level: 2,
          node_id: '13',
          risk_highlighter: 'high_risk',
          title: 'Total Pregnancies',
        } as any,
      },
    };
    wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedHierarchichalDataTable {...props} />
        </Router>
      </Provider>
    );
    expect(toJson(wrapper.find('tbody'))).toMatchSnapshot('hierarchichalDataTable');
    props = {
      match: {
        params: {
          current_level: 0,
          direction: 'up',
          from_level: 1,
          node_id: '13',
          risk_highlighter: 'high_risk',
          title: 'Total Pregnancies',
        } as any,
      },
    };
    wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedHierarchichalDataTable {...props} />
        </Router>
      </Provider>
    );
    expect(toJson(wrapper.find('tbody'))).toMatchSnapshot('hierarchichalDataTable');
  });
});
