import { ImageProps } from 'react-native';

export interface LogoImageAnimatedProps {
  onOff: boolean;
}
export interface LogoProps {
  additionalBoxStyles?: string;
  additionalImageStyles?: string;

  resizeMode?: ImageProps['resizeMode'];
}

export interface LogoImageProps {
  additionalBoxStyles?: string;

  resizeMode?: ImageProps['resizeMode'];
}
