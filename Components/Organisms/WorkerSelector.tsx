import { useQuery } from 'react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { getAllWorkers } from '../../helpers/api/Services/Worker';
import {
  Worker,
  WorkerSelectorListItem,
  WorkerSelectorProps,
} from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { WorkerSelectorItem } from '../Molecules/WorkerSelectorItem';

export function WorkerSelector({
  data,
  onFocusWorker,
  externalData,
}: WorkerSelectorProps) {
  const { data: workers } = useQuery('workers', () =>
    getAllWorkers(externalData),
  );
  const [selectorData, setSelectorData] = useState<Array<Worker> | undefined>(
    undefined,
  );
  const [focusedWorker, setFocusedWorker] = useState<Worker | undefined>(
    undefined,
  );

  useEffect(() => {
    if (data) setSelectorData(data && [...data]);
    else if (workers) setSelectorData(workers && [...workers]);
  }, [data, workers]);
  const ListItem = useCallback(
    ({ item }: WorkerSelectorListItem) => (
      <WorkerSelectorItem
        onFocusWorker={onFocusWorker}
        worker={item}
        focusedWorker={focusedWorker}
        setFocusedWorker={setFocusedWorker}
      />
    ),
    [focusedWorker],
  );

  // const WorkerSelectorItem = useCallback(()=>)

  return useMemo(
    () =>
      selectorData?.length && (
        <FlashList
          onLoad={info =>
            console.log('WorkersSelector rendered in: ', info.elapsedTimeInMs)
          }
          horizontal
          extraData={focusedWorker}
          showsHorizontalScrollIndicator={false}
          estimatedItemSize={80}
          renderItem={ListItem}
          data={selectorData}
        />
      ),
    [selectorData, focusedWorker],
  );
}
