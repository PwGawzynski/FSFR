import { View } from 'react-native';
import { LineDividerProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function LineDivider({ abs }: LineDividerProps) {
  return <View className={`h-[1px]  bg-black mt-4 mb-4 ${abs}`} />;
}
