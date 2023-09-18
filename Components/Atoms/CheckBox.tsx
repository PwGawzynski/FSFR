import { Checkbox } from 'react-native-paper';
import { useState } from 'react';
import { CheckBoxProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function CheckBox<T extends () => void>({ onPress }: CheckBoxProps<T>) {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      status={checked ? 'checked' : 'indeterminate'}
      onPress={() => {
        onPress();
        setChecked(prevState => !prevState);
      }}
    />
  );
}
