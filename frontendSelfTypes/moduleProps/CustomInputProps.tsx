import { TextInput } from 'react-native';

export interface CustomInputProps {
  value: string;
  onChange: (value: string) => void;
  inputMode?:
    | 'addressCity'
    | 'countryName'
    | 'creditCardNumber'
    | 'emailAddress'
    | 'fullStreetAddress'
    | 'givenName'
    | 'name'
    | 'postalCode'
    | 'streetAddressLine1'
    | 'username'
    | 'password'
    | 'newPassword'
    | 'oneTimeCode';
  autoComplete?:
    | 'username'
    | 'name-given'
    | 'name-middle'
    | 'street-address'
    | 'tel'
    | 'email'
    | 'password'
    | 'postal-code'
    | null;
  isPwd?: boolean;

  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search'
    | 'visible-password';
  onFocus?: () => void;
  onDeFocus?: () => void;

  refGetter?: React.MutableRefObject<TextInput | null>;

  onSubmit?: () => void;
}
