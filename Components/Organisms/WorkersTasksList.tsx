import { FlatList } from 'react-native';
import { useMutation } from 'react-query';
import { useEffect, useMemo, useState } from 'react';
import { WorkersTaskList } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { WorkersTaskListElement } from '../Molecules/WorkersTaskListElement';
import { remTask } from '../../helpers/api/Services/Task';

export function WorkersTasksList({ data }: WorkersTaskList) {
  const { mutate: removeTask } = useMutation(remTask);
  const [remTaskId, setRemTaskId] = useState<string | undefined>();
  const afterRemData = data.filter(orderTask => {
    console.log(orderTask.id !== remTaskId);
    return orderTask.id !== remTaskId;
  });
  useEffect(() => {
    if (remTaskId) removeTask(remTaskId);
  }, [remTaskId]);
  return useMemo(
    () => (
      <FlatList
        data={afterRemData}
        keyExtractor={({ id }) => id}
        renderItem={({ item, index }) => (
          <WorkersTaskListElement
            worker={item.worker}
            id={item.id}
            index={index}
            type={item.type}
            onRemoveTask={taskId => {
              setRemTaskId(taskId);
            }}
            field={item.field}
          />
        )}
      />
    ),
    [afterRemData],
  );
}
