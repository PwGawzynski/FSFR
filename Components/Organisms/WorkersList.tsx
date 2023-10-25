import { FlatList } from 'react-native';
import { useQuery } from 'react-query';
import { getAllWorkers } from '../../helpers/api/Services/Worker';
import { WorkerComponent } from './WorkerComponent';
import { SpaceDivider } from '../Molecules/SpaceDivider';
import { WorkerListProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function WorkersList({ filterMethod }: WorkerListProps) {
  const { data: workers } = useQuery('workers', () => getAllWorkers());
  const filtered =
    (filterMethod && workers && workers.filter(filterMethod)) || workers;
  console.log('Worker list Render');
  return (
    <FlatList
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={SpaceDivider}
      showsVerticalScrollIndicator={false}
      className="mt-8"
      data={filtered}
      renderItem={({ item }) => <WorkerComponent item={item} />}
    />
  );
}
