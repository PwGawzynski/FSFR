import React from 'react';
import { render } from '@testing-library/react-native';
import { LogoImage } from '../Components/Atoms/LogoImage';
import '@testing-library/react-native/extend-expect';

describe('LogoImage Component', () => {
  test('renders LogoImage component', () => {
    const { getByTestId } = render(<LogoImage resizeMode="cover" abs="" />);

    expect(getByTestId('logo-image')).toBeTruthy();
  });

  test('renders visible LogoImage component', () => {
    const { getByTestId } = render(<LogoImage resizeMode="cover" abs="" />);

    expect(getByTestId('logo-image')).toBeTruthy();
  });

  test('renders LogoImage with correct resizeMode', () => {
    const { getByTestId } = render(<LogoImage resizeMode="contain" abs="" />);

    expect(getByTestId('logo-image-container')).toBeVisible();
  });
});
