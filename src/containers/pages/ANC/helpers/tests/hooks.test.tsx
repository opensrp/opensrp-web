import { mount } from 'enzyme';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { FilterStateAction, useFilters } from '../hooks';

import { ReactWrapper } from 'enzyme';
import { any } from 'prop-types';

const act = ReactTestUtils.act;

/** interface for the state that is returned  by the hook. */
interface ReactWrapperWithHookState<T> extends ReactWrapper {
  getProps: () => T;
}

/** wrapper that allows us to test hook functionality
 * @param {() => any} theHook - the hook to be tested
 * @param {} mountFunction - either of shallow or mount
 * @param {any} args - arguments to initialize the hook
 */
export function HookWrapper<ExpectedState = any>(
  theHook: any,
  mountFunction: any
): ReactWrapperWithHookState<ExpectedState> {
  function WrappedHook() {
    const Output: React.FC<{ output: any }> = props => {
      return <></>;
    };
    const output = theHook();

    return <Output output={output} />;
  }

  const wrapper = mountFunction(<WrappedHook />);

  /** a getter function that allows us to peak into props returned
   * by the wrapped hook.
   */
  wrapper.getProps = () => wrapper.find('Output').props().output;

  return wrapper;
}

/** test all setter functions
 * test
 */

describe('src/containers/ANC/hooks.useParamsFilters', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('works just fine', () => {
    const wrapper = HookWrapper(useFilters, mount);

    const { filters } = wrapper.getProps();
    expect(filters).toEqual({});
  });

  it('adding filters work correctly', () => {
    const wrapper = HookWrapper(useFilters, mount);
    expect(wrapper.getProps().filters).toEqual({});

    act(() => {
      const filterStateAction: FilterStateAction = {
        filterId: 'random',
        fitlerFunction: f => !!f,
        properties: {},
      };
      wrapper.getProps().addFilters();
    });
    wrapper.update();
    expect(wrapper.getProps().filters).toEqual({ pageSize: 2 });

    act(() => {
      wrapper.getProps().addFilters({ searchText: 'Doc' });
    });
    wrapper.update();
    expect(wrapper.getProps().filters).toEqual({ pageSize: 2, searchText: 'Doc' });
  });

  it('resetsFilters correctly', () => {
    const wrapper = HookWrapper(useFilters, mount);
    expect(wrapper.getProps().filters).toEqual({});

    act(() => {
      wrapper.getProps().resetFilters({ pageSize: 5 });
    });

    wrapper.update();
    expect(wrapper.getProps().filters).toEqual({ pageSize: 5 });

    act(() => {
      wrapper.getProps().resetFilters({ searchText: 'text' });
    });

    wrapper.update();
    expect(wrapper.getProps().filters).toEqual({ searchText: 'text' });
  });
});
