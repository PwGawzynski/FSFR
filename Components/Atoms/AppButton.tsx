import { Text, TouchableOpacity } from 'react-native';

export interface Props {
  action: () => void;
  context: string;

  additionalStyles?: string;
}
export function AppButton({ action, context, additionalStyles }: Props) {
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
