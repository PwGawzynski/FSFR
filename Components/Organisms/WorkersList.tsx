import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useQuery } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import { getAllWorkers } from '../../helpers/api/Services/Worker';
import {
  WorkerComponentI,
  WorkerPosition,
} from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { ProfilePhoto } from '../Atoms/ProfilePhoto';
import { getFontScaledSize } from '../../helpers/style/fontSize';
import { OwnerWorkersMaterialRootNavigation } from '../../FrontendSelfTypes/navigation/types';

function WorkerComponent({ item: worker }: WorkerComponentI) {
  const navigation =
    useNavigation<
      OwnerWorkersMaterialRootNavigation<
        'materialWorkersRoot',
        'workersRoot',
        'workers'
      >
    >();
  const navigateToWorkersDetails = () =>
    navigation.navigate('workerDetails', { workerId: worker.id });

  return (
    <TouchableOpacity
      onPress={navigateToWorkersDetails}
      className="w-full h-20 flex flex-row items-center"
    >
      <View className="w-16 h-full flex-col pt-1">
        <ProfilePhoto abs="h-12 w-12" />
      </View>
      <View className="grow h-full flex-col justify-between shrink overflow-hidden">
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={{ fontSize: getFontScaledSize(18) }}
          className="font-bold w-full leading-none text-left"
        >
          {worker.name} {worker.surname}
        </Text>
        <View className="justify-between  flex-row">
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            className="font-medium text-[#848484] leading-none text-left uppercase"
          >
            Worker_ID
          </Text>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            className="font-medium text-[#848484] leading-none text-right"
          >
            {worker.id.split('-')[worker.id.split('-').length - 1]}
          </Text>
        </View>

        <View className="justify-between  flex-row">
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            className="font-medium text-[#848484] leading-none text-left uppercase"
          >
            Position
          </Text>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            className="font-medium text-[#279840] leading-none text-right uppercase"
          >
            {WorkerPosition[worker.position]}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function WorkerListDividerComponent() {
  return <View className="h-4 w-full " />;
}

export function WorkersList() {
  const { data: workers } = useQuery('workers', () => getAllWorkers());
  return (
    <FlatList
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={WorkerListDividerComponent}
      showsVerticalScrollIndicator={false}
      className="mt-8"
      data={workers}
      renderItem={({ item }) => <WorkerComponent item={item} />}
    />
  );
}
