import React from 'react';
import { render } from '@testing-library/react-native';
import { TitleValueInfoComponent } from '../Components/Atoms/TitleValueInfoComponent';
import '@testing-library/react-native/extend-expect';

describe('TitleValueInfoComponent Component', () => {
  test('renders TitleValueInfoComponent component', () => {
    const { getByTestId } = render(
      <TitleValueInfoComponent
        titles={['Title1', 'Title2']}
        keys={['Value1', 'Value2']}
      />,
    );

    expect(getByTestId('title-value-info')).toBeTruthy();
  });

  test('renders correct number of title-value pairs', () => {
    const { getAllByTestId } = render(
      <TitleValueInfoComponent
        titles={['Title1', 'Title2']}
        keys={['Value1', 'Value2']}
      />,
    );

    expect(getAllByTestId('title-value-pair')).toHaveLength(2);
  });

  test('renders correct titles and values', () => {
    const { getByText } = render(
      <TitleValueInfoComponent
        titles={['Title1', 'Title2']}
        keys={['Value1', 'Value2']}
      />,
    );

    expect(getByText('Title1')).toBeTruthy();
    expect(getByText('Title2')).toBeTruthy();
    expect(getByText('Value1')).toBeTruthy();
    expect(getByText('Value2')).toBeTruthy();
  });

  test('does not render title-value pairs when titles and keys arrays are empty', () => {
    const { queryByTestId } = render(
      <TitleValueInfoComponent titles={[]} keys={[]} />,
    );

    expect(queryByTestId('title-value-pair')).toBeNull();
  });

  test('renders title-value pairs with the correct number of elements', () => {
    const { getAllByTestId } = render(
      <TitleValueInfoComponent
        titles={['Title1', 'Title2']}
        keys={['Value1', 'Value2', 'Value3']}
      />,
    );

    expect(getAllByTestId('title-value-pair')[0].children).toHaveLength(2); // Pierwsza para
    expect(getAllByTestId('title-value-pair')[1].children).toHaveLength(2); // Druga para
  });
  test('renders titles and values with correct text content', () => {
    const { getByText } = render(
      <TitleValueInfoComponent
        titles={['Title1', 'Title2']}
        keys={['Value1', 'Value2']}
      />,
    );

    expect(getByText('Title1')).toHaveTextContent('Title1');
    expect(getByText('Title2')).toHaveTextContent('Title2');
    expect(getByText('Value1')).toHaveTextContent('Value1');
    expect(getByText('Value2')).toHaveTextContent('Value2');
  });

  test('renders titles and values with correct case sensitivity', () => {
    const { getByText } = render(
      <TitleValueInfoComponent
        titles={['Title1', 'title2']}
        keys={['Value1', 'value2']}
      />,
    );

    expect(getByText('Title1')).toHaveTextContent('Title1');
    expect(getByText('title2')).toHaveTextContent('title2');
    expect(getByText('Value1')).toHaveTextContent('Value1');
    expect(getByText('value2')).toHaveTextContent('value2');
  });

  test('renders titles and values with correct number of characters', () => {
    const { getByText } = render(
      <TitleValueInfoComponent
        titles={['Short', 'LongTitle']}
        keys={['Value1', 'Value2']}
      />,
    );

    expect(getByText('Short')).toHaveTextContent('Short');
    expect(getByText('LongTitle')).toHaveTextContent('LongTitle');
    expect(getByText('Value1')).toHaveTextContent('Value1');
    expect(getByText('Value2')).toHaveTextContent('Value2');
  });
});
