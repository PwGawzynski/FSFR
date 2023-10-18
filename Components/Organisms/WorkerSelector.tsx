import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { useQuery } from 'react-query';
import { ProfilePhoto } from '../Atoms/ProfilePhoto';
import { getAllWorkers } from '../../helpers/api/Services/Worker';
import { WorkerSelectorProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function WorkerSelector({
  data,
  focusedWorker,
  setFocusedWorker,
  externalData,
}: WorkerSelectorProps) {
  const { data: workers } = useQuery('workers', () =>
    getAllWorkers(externalData),
  );
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mb-2"
    >
      {workers?.map(worker => (
        <TouchableOpacity
          onPress={() => setFocusedWorker(worker)}
          className="flex flex-col items-center justify-center pr-2"
          key={worker.id}
        >
          <ProfilePhoto
            focused={worker.id === focusedWorker?.id}
            abs="w-14 h-14"
          />
          <Text className="mt-1">{worker.name}</Text>
        </TouchableOpacity>
      ))}
      {data?.map(worker => (
        <TouchableOpacity
          onPress={() => setFocusedWorker(worker)}
          className="flex flex-col items-center justify-center pr-2"
          key={worker.id}
        >
          <ProfilePhoto
            focused={worker.id === focusedWorker?.id}
            abs="w-14 h-14"
          />
          <Text className="mt-1">{worker.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
