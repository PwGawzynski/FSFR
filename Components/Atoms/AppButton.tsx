import { Text, TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import { DeviceType } from 'expo-device';
import { AppSettings } from '../../helpers/appSettings/contexts';
import { AppButtonProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function AppButton({ action, context, abs, ats }: AppButtonProps) {
  const appSettings = useContext(AppSettings);
  const deviceType = appSettings?.settings?.deviceType || DeviceType.PHONE;

  return (
    <TouchableOpacity
      className={`w-full h-9 bg-black rounded-2xl justify-center ${abs} ${
        deviceType === DeviceType.PHONE ? '' : 'h-10'
      }`}
      onPress={action}
    >
      <Text
        className={`text-white text-center text-base font-bold uppercase tracking-wide ${ats} ${
          deviceType === DeviceType.PHONE ? '' : 'text-lg'
        }`}
      >
        {context}
      </Text>
    </TouchableOpacity>
  );
}
