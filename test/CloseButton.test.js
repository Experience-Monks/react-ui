import React from 'react';
import { CloseButton } from '../dist/index.module.js';
import renderer from 'react-test-renderer';

describe('CloseButton', () => {
  const component = renderer.create(<CloseButton />);

  let tree;

  it('should render correctly', () => {
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
