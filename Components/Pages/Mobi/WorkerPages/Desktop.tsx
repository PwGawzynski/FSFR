import { SafeAreaView, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { ScreenTitleHeader } from '../../../Atoms/ScreenTitleHeader';
import TaskList from '../../../Organisms/TaskList';
import { EmptyListInfo } from '../../../Molecules/EmptyListInfo';

export function Desktop() {
  const focused = useIsFocused();
  return (
    <SafeAreaView className="w-full h-full flex">
      <View className="flex-1 mr-4 ml-4">
        <ScreenTitleHeader variant="lg">Desktop</ScreenTitleHeader>
        <View className="flex-1 mt-4">
          <TaskList
            ListEmptyComponent={<EmptyListInfo text="Nothing to see here..." />}
            reloadIndicator={focused}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
