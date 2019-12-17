import { mount } from 'enzyme';
import { ReactWrapper } from 'enzyme';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { useFilterFunctions } from '../hooks';
import { anotherFilterStateAction, filterStateAction } from './fixtures';

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

describe('src/containers/ANC/hooks.useParamsFilters', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('works just fine', () => {
    const wrapper = HookWrapper(useFilterFunctions, mount);

    const { getFilters } = wrapper.getProps();
    expect(getFilters()).toEqual([]);
  });

  it('adding filters work correctly', () => {
    const wrapper = HookWrapper(useFilterFunctions, mount);

    act(() => {
      wrapper.getProps().addFilters(filterStateAction);
    });
    wrapper.update();
    expect(wrapper.getProps().getFilters()).toEqual([filterStateAction]);
    expect(wrapper.getProps().getFilters()).toEqual([filterStateAction]);

    act(() => {
      wrapper.getProps().addFilters(anotherFilterStateAction);
    });
    wrapper.update();
    expect(wrapper.getProps().getFilters()).toEqual([filterStateAction, anotherFilterStateAction]);

    act(() => {
      wrapper.getProps().removeFilters();
    });
    wrapper.update();
    expect(wrapper.getProps().getFilters()).toEqual([]);
  });

  it('adding filters with same id correctly', () => {
    const wrapper = HookWrapper(useFilterFunctions, mount);

    act(() => {
      wrapper.getProps().addFilters(filterStateAction);
    });
    wrapper.update();
    expect(wrapper.getProps().getFilters()).toEqual([filterStateAction]);
    expect(wrapper.getProps().getFilters()).toEqual([filterStateAction]);

    act(() => {
      wrapper.getProps().addFilters({ ...anotherFilterStateAction, filterId: 'random' });
    });
    wrapper.update();
    expect(wrapper.getProps().getFilters()).toEqual([
      { ...anotherFilterStateAction, filterId: 'random' },
    ]);
    expect(wrapper.getProps().getFilterById('random')).toEqual({
      ...anotherFilterStateAction,
      filterId: 'random',
    });
  });

  it('resets filters corectly', () => {
    const wrapper = HookWrapper(useFilterFunctions, mount);

    act(() => {
      wrapper.getProps().addFilters(filterStateAction);
    });
    wrapper.update();
    expect(wrapper.getProps().getFilters()).toEqual([filterStateAction]);
    expect(wrapper.getProps().getFilters()).toEqual([filterStateAction]);

    act(() => {
      wrapper.getProps().resetFilters(anotherFilterStateAction);
    });
    wrapper.update();
    expect(wrapper.getProps().getFilters()).toEqual([anotherFilterStateAction]);
  });
});
