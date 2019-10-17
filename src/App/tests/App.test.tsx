import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createBrowserHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import CustomOauthLogin from '../../components/CustomAuthLogin';
import store from '../../store';
import App from '../App';

const history = createBrowserHistory();

describe('App', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders App correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
    // should have a top header
    const headerWrapper = wrapper.find('HeaderComponent');
    expect(headerWrapper.length).toEqual(1);

    // these test are not valid anymore as when the user
    // is not logged in, we show the CustomOathLogin page

    // should have a sidebar for the side navigation
    // const sideMenuWrapper = wrapper.find('.sidebar');
    // expect(sideMenuWrapper.length).toEqual(1);

    // should have the main page where the page views are rendered
    // const mainPageWrapper = wrapper.find('div.container-section');
    // expect(mainPageWrapper.length).toEqual(1);

    const customOathLoginChildren = wrapper.find(CustomOauthLogin).children();

    expect(toJson(customOathLoginChildren)).toMatchSnapshot();
    wrapper.unmount();
  });
});
