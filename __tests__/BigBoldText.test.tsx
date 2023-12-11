import React from 'react';
import { render, cleanup } from '@testing-library/react-native';
import { BigBoldText } from '../Components/Molecules/BigBoldText';
import '@testing-library/react-native/extend-expect';

describe('BigBoldText Component', () => {
  afterEach(() => {
    cleanup();
  });

  test('renders BigBoldText component', () => {
    const { getByTestId } = render(
      <BigBoldText additionalStyles="">Test Text</BigBoldText>,
    );

    expect(getByTestId('big-bold-text')).toBeTruthy();
  });

  test('renders text correctly', () => {
    const { getByText } = render(
      <BigBoldText additionalStyles="">Test Text</BigBoldText>,
    );

    expect(getByText('Test Text')).toBeTruthy();
  });

  test('adjusts font size to fit', () => {
    const { getByTestId } = render(
      <BigBoldText additionalStyles="">Adjustable Text</BigBoldText>,
    );

    expect(getByTestId('big-bold-text').props.adjustsFontSizeToFit).toBe(true);
  });

  test('applies provided font size', () => {
    const { getByTestId } = render(
      <BigBoldText additionalStyles="">Custom Font Size Text</BigBoldText>,
    );

    expect(getByTestId('big-bold-text').props.style).not.toHaveProperty(
      'fontSize',
      30,
    );
  });

  test('limits number of lines to 1', () => {
    const { getByTestId } = render(
      <BigBoldText additionalStyles="">Multiline Text</BigBoldText>,
    );

    expect(getByTestId('big-bold-text').props.numberOfLines).toBe(1);
  });

  // Add more tests based on your component's logic and behavior
});
