import { Text, View } from 'react-native';
import { ContainerWCenteredLinedTextProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function ContainerWCenteredLinedText({
  messages,
}: ContainerWCenteredLinedTextProps) {
  return (
    <View className="flex grow flex-col items-center justify-center">
      {Array.isArray(messages) &&
        messages.map(msg => (
          <Text
            key={Math.random()}
            className=" text-lg w-max text-center text-black font-bold"
          >
            {msg}
          </Text>
        ))}
      {!Array.isArray(messages) && (
        <Text className="text-lg text-center text-black font-bold">
          {messages}
        </Text>
      )}
    </View>
  );
}
