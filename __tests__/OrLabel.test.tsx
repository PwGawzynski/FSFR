import React from 'react';
import { render } from '@testing-library/react-native';
import { OrLabel } from '../Components/Atoms/OrLabel';
import '@testing-library/react-native/extend-expect';

describe('OrLabel Component', () => {
  test('renders OrLabel component', () => {
    const { getByTestId } = render(<OrLabel />);

    expect(getByTestId('or-label')).toBeTruthy();
  });

  test('renders correct text content', () => {
    const { getByText } = render(<OrLabel />);

    expect(getByText('OR')).toBeTruthy();
  });

  test('renders three child elements', () => {
    const { getByTestId } = render(<OrLabel />);

    // Sprawdzanie, czy komponent zawiera trzy elementy potomne
    expect(getByTestId('or-label')).toHaveProp('children', expect.any(Array));
    expect(getByTestId('or-label').props.children).toHaveLength(3);
  });
});
