import { useMutation } from 'react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import {
  WorkersTaskList,
  WorkerTaskListRenderItem,
} from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { WorkersTaskListElement } from '../Molecules/WorkersTaskListElement';
import { remTask } from '../../helpers/api/Services/Task';
import { LoadingAnimation } from '../Atoms/LoadingAnimation';

export function WorkersTasksList({
  data,
  navigation,
  orderId,
}: WorkersTaskList) {
  const { mutate: removeTask } = useMutation(remTask);
  const [afterRemData, setAfterRemData] = useState(data);

  useEffect(() => {
    setAfterRemData(data);
  }, [data]);

  const renderItem = useCallback(
    ({ item, index }: WorkerTaskListRenderItem) => (
      <WorkersTaskListElement
        onPress={taskId =>
          navigation.navigate('AddMachine', { taskId, orderId })
        }
        createdAt={item.createdAt}
        isDone={item.isDone}
        closedAt={item.closedAt}
        openedAt={item.openedAt}
        key={Math.random()}
        field={item.field}
        worker={item.worker}
        id={item.id}
        index={index}
        type={item.type}
        onRemoveTask={taskId => {
          // TODO
          setAfterRemData(prevState => [
            ...prevState.filter(orderTask => orderTask.id !== taskId),
          ]);
          removeTask(taskId);
        }}
      />
    ),
    [],
  );

  return useMemo(
    () =>
      afterRemData.length ? (
        <FlashList
          onLoad={info =>
            console.log('WorkersTaskList has been loaded in ', info)
          }
          estimatedItemSize={70}
          keyExtractor={item => item.id}
          removeClippedSubviews
          showsVerticalScrollIndicator={false}
          data={afterRemData}
          renderItem={renderItem}
        />
      ) : (
        <LoadingAnimation />
      ),
    [afterRemData],
  );
}
