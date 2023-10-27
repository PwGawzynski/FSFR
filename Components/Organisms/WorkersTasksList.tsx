import { FlatList, ScrollView } from 'react-native';
import { useMutation } from 'react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  WorkersTaskList,
  WorkerTaskListRenderItem,
} from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { WorkersTaskListElement } from '../Molecules/WorkersTaskListElement';
import { remTask } from '../../helpers/api/Services/Task';

export function WorkersTasksList({ data }: WorkersTaskList) {
  const { mutate: removeTask } = useMutation(remTask);
  const [afterRemData, setAfterRemData] = useState(data);
  useEffect(() => {
    setAfterRemData(data);
  }, [data]);

  const renderItem = useCallback(
    ({ item, index }: WorkerTaskListRenderItem) => (
      <WorkersTaskListElement
        key={Math.random()}
        field={item.field}
        worker={item.worker}
        id={item.id}
        index={index}
        type={item.type}
        onRemoveTask={taskId => {
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
    () => (
      <FlatList
        keyExtractor={item => item.id}
        removeClippedSubviews
        showsVerticalScrollIndicator={false}
        data={afterRemData}
        renderItem={renderItem}
      />
    ),
    [afterRemData],
  );
}
