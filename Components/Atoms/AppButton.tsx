import { AppButtonProps } from 'frontendSelfTypes/moduleProps/AppButtonProps';
import { Text, TouchableOpacity } from 'react-native';

export function AppButton({
  action,
  context,
  additionalStyles,
}: AppButtonProps) {
  return (
    <TouchableOpacity
      className={`w-full h-9 bg-black rounded-2xl justify-center ${additionalStyles}`}
      onPress={action}
    >
      <Text className="text-white text-center text-base font-bold uppercase tracking-wide">
        {context}
      </Text>
    </TouchableOpacity>
  );
}
