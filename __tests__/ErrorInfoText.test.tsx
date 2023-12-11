import React from 'react';
import { render } from '@testing-library/react-native';
import { ErrorInfoText } from '../Components/Atoms/ErrorInfoText';
import '@testing-library/react-native/extend-expect';

describe('ErrorInfoText Component', () => {
  test('renders ErrorInfoText component with children', () => {
    const { getByText } = render(
      <ErrorInfoText>Sample Error Text</ErrorInfoText>,
    );

    expect(getByText('Sample Error Text')).toBeTruthy();
  });

  test('applies additional styles to ErrorInfoText component', () => {
    const { getByText } = render(
      <ErrorInfoText additionalStyles="font-bold">
        Sample Error Text
      </ErrorInfoText>,
    );

    expect(getByText('Sample Error Text')).toBeVisible();
  });

  test('renders ErrorInfoText component without additional styles', () => {
    const { getByText } = render(
      <ErrorInfoText>Sample Error Text</ErrorInfoText>,
    );

    expect(getByText('Sample Error Text')).not.toHaveStyle({
      fontWeight: '700',
    });
  });
  test('renders ErrorInfoText component with additional styles', () => {
    const { getByText } = render(
      <ErrorInfoText additionalStyles="flex">Sample Error Text</ErrorInfoText>,
    );

    expect(getByText('Sample Error Text')).not.toHaveStyle({
      display: 'flex',
    });
  });
});
