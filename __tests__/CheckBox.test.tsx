import { fireEvent, render } from '@testing-library/react-native';
import { CheckBox } from '../Components/Atoms/CheckBox';
import mock = jest.mock;

describe('<CheckBox/> component', () => {
  test('renders without error', () => {
    const { getByTestId } = render(<CheckBox onPress={() => ''} />);
    const value = getByTestId('CheckBoxTestId');
    expect(value).toBeTruthy();
  });

  test('react on press', () => {
    const fn = jest.fn();
    const { getByTestId } = render(<CheckBox onPress={fn} />);
    fireEvent.press(getByTestId('CheckBoxTestId'));
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
