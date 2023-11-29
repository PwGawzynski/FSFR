import { useQuery } from 'react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { Text, View } from 'react-native';
import { getAllWorkers } from '../../helpers/api/Services/Worker';
import {
  WorkerSelectorListItem,
  WorkerSelectorProps,
} from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { WorkerSelectorItem } from '../Molecules/WorkerSelectorItem';
import { WorkerResponseBase } from '../../FarmServiceTypes/Worker/Responses';

function Empty() {
  return (
    <View className="flex-1 w-full items-center justify-center">
      <Text className="text-center">Add tasks firstly...</Text>
    </View>
  );
}

export function WorkerSelector({
  data,
  onFocusWorker,
  externalData,
}: WorkerSelectorProps) {
  const { data: workers } = useQuery('workers', () =>
    getAllWorkers(externalData),
  );
  const [selectorData, setSelectorData] = useState<
    Array<WorkerResponseBase> | undefined
  >(undefined);
  const [focusedWorker, setFocusedWorker] = useState<
    WorkerResponseBase | undefined
  >(undefined);

  useEffect(() => {
    if (data && data.length) setSelectorData(data && [...data]);
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
    () => (
      <FlashList
        onLoad={info =>
          console.log('WorkersSelector rendered in: ', info.elapsedTimeInMs)
        }
        ListEmptyComponent={<Empty />}
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
