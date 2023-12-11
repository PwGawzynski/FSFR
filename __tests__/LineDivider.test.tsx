import React from 'react';
import { render } from '@testing-library/react-native';
import { LineDivider } from '../Components/Atoms/LineDivider';
import '@testing-library/react-native/extend-expect';

describe('LineDivider Component', () => {
  test('renders LineDivider component', () => {
    const { getByTestId } = render(<LineDivider abs="" />);

    expect(getByTestId('line-divider')).toBeTruthy();
  });

  test('renders LineDivider with correct absolute positioning', () => {
    const { getByTestId } = render(<LineDivider abs="absolute" />);

    expect(getByTestId('line-divider')).not.toHaveStyle({
      position: 'absolute',
    });
  });
});
