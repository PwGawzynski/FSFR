import { FlatList } from 'react-native';
import { useQuery } from 'react-query';
import { getAllWorkers } from '../../helpers/api/Services/Worker';
import { WorkerComponent } from './WorkerComponent';
import { SpaceDivider } from '../Molecules/SpaceDivider';

export function WorkersList() {
  const { data: workers } = useQuery('workers', () => getAllWorkers());
  return (
    <FlatList
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={SpaceDivider}
      showsVerticalScrollIndicator={false}
      className="mt-8"
      data={workers}
      renderItem={({ item }) => <WorkerComponent item={item} />}
    />
  );
}
