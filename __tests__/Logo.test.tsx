import React from 'react';
import { render } from '@testing-library/react-native';
import { Logo } from '../Components/Atoms/Logo';

describe('Logo Component', () => {
  test('renders Logo component', () => {
    const { getByTestId } = render(
      <Logo abs="" additionalImageStyles="" resizeMode="cover" />,
    );

    expect(getByTestId('logo')).toBeTruthy();
  });
});
