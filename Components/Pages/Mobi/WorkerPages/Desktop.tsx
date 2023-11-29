import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useState } from 'react';
import { ScreenTitleHeader } from '../../../Atoms/ScreenTitleHeader';
import TaskList from '../../../Organisms/TaskList';
import { EmptyListInfo } from '../../../Molecules/EmptyListInfo';
import { FilterTask } from '../../../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function Desktop() {
  const focused = useIsFocused();
  const [filter, setFilter] = useState(FilterTask.undone);
  return (
    <SafeAreaView className="w-full h-full flex">
      <View className="flex-1 mr-4 ml-4">
        <ScreenTitleHeader variant="lg">Desktop</ScreenTitleHeader>
        <View className="w-full flex-row justify-between mt-6 mb-6">
          <TouchableOpacity
            className={`rounded-lg h-6 border-black border-2 border-solid items-center justify-center w-1/4 ${
              filter === FilterTask.all ? 'bg-black' : 'bg-white'
            }`}
            onPress={() => setFilter(FilterTask.all)}
          >
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              className={` ${
                filter === FilterTask.all ? 'text-white' : 'text-black'
              } uppercase font-bold`}
            >
              all
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`rounded-lg h-6 border-black border-2 border-solid items-center justify-center w-1/4 ${
              filter === FilterTask.done ? 'bg-black' : 'bg-white'
            }`}
            onPress={() => setFilter(FilterTask.done)}
          >
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              className={` ${
                filter === FilterTask.done ? 'text-white' : 'text-black'
              } uppercase font-bold`}
            >
              done
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`rounded-lg h-6 border-black border-2 border-solid items-center justify-center w-1/4 ${
              filter === FilterTask.undone ? 'bg-black' : 'bg-white'
            }`}
            onPress={() => setFilter(FilterTask.undone)}
          >
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              className={` ${
                filter === FilterTask.undone ? 'text-white' : 'text-black'
              } uppercase font-bold`}
            >
              Undone
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-1 mt-4">
          <TaskList
            filter={filter}
            ListEmptyComponent={<EmptyListInfo text="Nothing to see here..." />}
            reloadIndicator={`${focused} ${filter}`}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
