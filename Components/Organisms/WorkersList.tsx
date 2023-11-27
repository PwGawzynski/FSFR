import { useQuery } from 'react-query';
import { FlashList } from '@shopify/flash-list';
import { useEffect, useMemo, useState } from 'react';
import { getAllWorkers } from '../../helpers/api/Services/Worker';
import { WorkerComponent } from './WorkerComponent';
import { SpaceDivider } from '../Molecules/SpaceDivider';
import { WorkerListProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { LoadingAnimation } from '../Atoms/LoadingAnimation';
import { EmptyListInfo } from '../Molecules/EmptyListInfo';
import { WorkerResponseBase } from '../../FarmServiceTypes/Worker/Responses';

export function WorkersList({
  filterMethod,
  reloadIndicator,
}: WorkerListProps) {
  const { data: workers } = useQuery('workers', () => getAllWorkers());
  const [filtered, setFiltered] = useState<
    Array<WorkerResponseBase> | undefined
  >(undefined);
  useEffect(() => {
    if (workers)
      setFiltered(
        (filterMethod && workers && workers.filter(filterMethod)) || workers,
      );
  }, [workers, reloadIndicator]);
  const list = useMemo(
    () =>
      filtered && (
        <FlashList
          ListEmptyComponent={
            <EmptyListInfo text="Sorry, cannot find this worker :( " />
          }
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
  return (filtered && list) || <LoadingAnimation />;
}
