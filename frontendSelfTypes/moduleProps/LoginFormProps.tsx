// TODO move to unified types
export interface DataObject {
  login: string;
  password: string;
}

export interface LoginFormProps {
  onFocus?: () => void;
  onDeFocus?: () => void;
}
