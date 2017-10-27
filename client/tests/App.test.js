/* eslint-disable */

import React from 'react';
import { shallow } from 'enzyme';

import App from '../src/containers/App';

const setup = () => {
  const defaultProps = {};

  const createComponent = (props) => {
    return shallow(<App {...props} />);
  };
  const wrapper = shallow(<App {...defaultProps} />);

  return {
    defaultProps,
    createComponent,
    wrapper,
  };
};

describe('<App />', () => {
  test('App does not render as empty or null', () => {
    const { wrapper } = setup();

    expect(wrapper.getNode()).toBeTruthy();
  });
});

/* eslint-enable */
