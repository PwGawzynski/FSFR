import { AppButtonProps } from 'frontendSelfTypes/moduleProps/AppButtonProps';
import { Text, TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import { DeviceType } from 'expo-device';
import { AppSettings } from '../../helpers/appSettings/contexts';

export function AppButton({
  action,
  context,
  additionalStyles,
  additionalTextStyles,
}: AppButtonProps) {
  const { deviceType } = useContext(AppSettings).settings;

  return (
    <TouchableOpacity
      className={`w-full h-9 bg-black rounded-2xl justify-center ${additionalStyles} ${
        deviceType === DeviceType.PHONE ? '' : 'h-10'
      }`}
      onPress={action}
    >
      <Text
        className={`text-white text-center text-base font-bold uppercase tracking-wide ${additionalTextStyles} ${
          deviceType === DeviceType.PHONE ? '' : 'text-lg'
        }`}
      >
        {context}
      </Text>
    </TouchableOpacity>
  );
}
