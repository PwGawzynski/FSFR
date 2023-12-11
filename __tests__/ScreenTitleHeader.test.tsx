import React from 'react';
import { render } from '@testing-library/react-native';
import { ScreenTitleHeader } from '../Components/Atoms/ScreenTitleHeader';
import '@testing-library/react-native/extend-expect';

describe('ScreenTitleHeader Component', () => {
  test('renders ScreenTitleHeader component', () => {
    const { getByTestId } = render(
      <ScreenTitleHeader variant="lg">ELO</ScreenTitleHeader>,
    );
    expect(getByTestId('screen-title-header')).toBeTruthy();
  });
  test('renders visible ScreenTitleHeader component', () => {
    const { getByTestId } = render(
      <ScreenTitleHeader variant="lg">ELO</ScreenTitleHeader>,
    );
    expect(getByTestId('screen-title-header')).toBeVisible();
  });
  test('renders visible with text ScreenTitleHeader component', () => {
    const { getByText } = render(
      <ScreenTitleHeader variant="lg">ELO</ScreenTitleHeader>,
    );
    expect(getByText('ELO')).toBeTruthy();
  });
});
