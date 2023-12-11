import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TaskType } from '../FarmServiceTypes/Task/Enums';
import { OrderAccountingFieldListItem } from '../Components/Molecules/OrderAccountingFieldListItem';

const mockItem = {
  field: {
    id: 'string',
    polishSystemId: 'string',

    area: 102,

    dateOfCollectionData: new Date(),

    address: {
      city: 'string',

      county: 'string',

      voivodeship: 'string',

      longitude: 'string',

      latitude: 'string',
    },
  },
  type: TaskType.Harvesting,
  priceWTax: 100.0,
  price: 10,
  id: '123',
  createdAt: new Date(),
};

describe('OrderAccountingFieldListItem Component', () => {
  test('renders OrderAccountingFieldListItem component', () => {
    const { getByTestId } = render(
      <OrderAccountingFieldListItem item={mockItem} />,
    );

    expect(getByTestId('order-accounting-field-list-item')).toBeTruthy();
  });

  test('renders TouchableOpacity', () => {
    const { getByTestId } = render(
      <OrderAccountingFieldListItem item={mockItem} />,
    );

    expect(getByTestId('order-accounting-field-list-item')).toBeTruthy();
  });

  /* test('TouchableOpacity onPress triggers callback', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <OrderAccountingFieldListItem item={mockItem} onPress={mockOnPress} />,
    );

    fireEvent.press(getByTestId('touchable-opacity'));

    expect(mockOnPress).toHaveBeenCalled();
  }); */

  test('renders field polishSystemId', () => {
    const { getByText } = render(
      <OrderAccountingFieldListItem item={mockItem} />,
    );

    expect(getByText(mockItem.field.polishSystemId)).toBeTruthy();
  });

  test('renders TaskType as text', () => {
    const { getByText } = render(
      <OrderAccountingFieldListItem item={mockItem} />,
    );

    expect(getByText(TaskType[mockItem.type])).toBeTruthy();
  });

  test('renders item priceWTax as text', () => {
    const { getByText } = render(
      <OrderAccountingFieldListItem item={mockItem} />,
    );

    expect(getByText(mockItem.priceWTax.toFixed(2))).toBeTruthy();
  });

  test('renders without onPress when not provided', () => {
    const { getByTestId } = render(
      <OrderAccountingFieldListItem item={mockItem} />,
    );

    expect(getByTestId('order-accounting-field-list-item')).not.toHaveProperty(
      'onPress',
    );
  });

  test('renders without callback when onPress not provided', () => {
    const { getByTestId } = render(
      <OrderAccountingFieldListItem item={mockItem} />,
    );

    fireEvent.press(getByTestId('order-accounting-field-list-item'));
  });
});
