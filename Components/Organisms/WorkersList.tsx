import { useQuery } from 'react-query';
import { FlashList } from '@shopify/flash-list';
import { useEffect, useMemo, useState } from 'react';
import { getAllWorkers } from '../../helpers/api/Services/Worker';
import { WorkerComponent } from './WorkerComponent';
import { SpaceDivider } from '../Molecules/SpaceDivider';
import {
  Worker,
  WorkerListProps,
} from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function WorkersList({ filterMethod }: WorkerListProps) {
  const { data: workers } = useQuery('workers', () => getAllWorkers());
  const [filtered, setFiltered] = useState<Array<Worker> | undefined>(
    undefined,
  );
  useEffect(() => {
    if (workers)
      setFiltered(
        (filterMethod && workers && workers.filter(filterMethod)) || workers,
      );
  }, [workers]);
  return useMemo(
    () =>
      filtered?.length && (
        <FlashList
          onLoad={info => console.log('WorkersList has been loaded in ', info)}
          keyExtractor={({ id }) => id}
          ItemSeparatorComponent={SpaceDivider}
          showsVerticalScrollIndicator={false}
          data={filtered}
          contentContainerStyle={{ paddingTop: 20 }}
          estimatedItemSize={80}
          renderItem={({ item }) => <WorkerComponent item={item} />}
        />
      ),
    [filtered],
  );
}
