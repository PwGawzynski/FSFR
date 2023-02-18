import { Text, View } from 'react-native';

export function OrLabel() {
  return (
    <View className="w-full items-center h-10 flex flex-row">
      <View className="h-[1px] flex-1 bg-black" />
      <Text className="flex-1 text-center">OR</Text>
      <View className="flex-1 h-[1px] bg-black" />
    </View>
  );
}
