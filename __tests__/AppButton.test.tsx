import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { AppButton } from '../Components/Atoms/AppButton';

describe('AppButton Component', () => {
  test('renders without error', async () => {
    const { getByText } = render(<AppButton context="GO" action={() => ''} />);
    await waitFor(() => expect(getByText('GO')).toBeTruthy());
  });

  test('calls the provided action on press', () => {
    const mockAction = jest.fn();
    const { getByText } = render(
      <AppButton action={mockAction} context="Click me" />,
    );
    fireEvent.press(getByText('Click me'));
    expect(mockAction).toHaveBeenCalledTimes(1);
  });
});
