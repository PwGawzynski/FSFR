import { ImageProps } from 'react-native';

export interface LogoImageAnimatedProps {
  onOff: boolean;
}
export interface AnimatedPositionAppButtonProps {
  isFocused: boolean;
}

export interface LogoImageProps {
  additionalBoxStyles?: string;

  resizeMode?: ImageProps['resizeMode'];
}
