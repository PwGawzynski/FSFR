import React from 'react';
import { render, waitFor, cleanup } from '@testing-library/react-native';
import { AppearingText } from '../Components/Molecules/AppearingText';

jest.useFakeTimers();

describe('AppearingText Component', () => {
  afterEach(() => {
    cleanup();
  });

  test('renders AppearingText component', () => {
    const { getByTestId } = render(
      <AppearingText onAnimationEnd={() => ''} onUnmountAnimationEnd={() => ''}>
        ELO
      </AppearingText>,
    );

    expect(getByTestId('appearing-text')).toBeTruthy();
  });

  test('applies initial opacity of 0', () => {
    const { getByTestId } = render(
      <AppearingText onAnimationEnd={() => ''} onUnmountAnimationEnd={() => ''}>
        ELO
      </AppearingText>,
    );

    const animatedText = getByTestId('appearing-text');
    expect(animatedText.props.style.opacity).toBe(0);
  });

  test('applies the correct font size', () => {
    const { getByTestId } = render(
      <AppearingText onAnimationEnd={() => ''} onUnmountAnimationEnd={() => ''}>
        ELO
      </AppearingText>,
    );

    const animatedText = getByTestId('appearing-text');
    expect(animatedText.props.style.fontSize).toBeGreaterThan(0);
  });

  test('triggers onAnimationEnd callback after animation', async () => {
    const onAnimationEndMock = jest.fn();
    render(
      <AppearingText
        onAnimationEnd={onAnimationEndMock}
        onUnmountAnimationEnd={() => ''}
      >
        ELO
      </AppearingText>,
    );

    jest.runAllTimers();
    await waitFor(() => expect(onAnimationEndMock).toHaveBeenCalled());
  });

  test('triggers onUnmountAnimationEnd callback on component unmount', async () => {
    const onUnmountAnimationEndMock = jest.fn();
    const { unmount } = render(
      <AppearingText
        onAnimationEnd={() => ''}
        onUnmountAnimationEnd={onUnmountAnimationEndMock}
      >
        ELO
      </AppearingText>,
    );

    unmount();
    jest.runAllTimers();
    await waitFor(() => expect(onUnmountAnimationEndMock).toHaveBeenCalled());
  });
});
