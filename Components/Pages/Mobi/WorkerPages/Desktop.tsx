import { SafeAreaView, View } from 'react-native';
import { ScreenTitleHeader } from '../../../Atoms/ScreenTitleHeader';

export function Desktop() {
  return (
    <SafeAreaView className="w-full h-full flex">
      <View className="flex-1 mr-4 ml-4">
        <ScreenTitleHeader variant="lg">Desktop</ScreenTitleHeader>
      </View>
    </SafeAreaView>
  );
}
