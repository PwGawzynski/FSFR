import React, { memo, useCallback, useMemo } from 'react';
import { useQuery } from 'react-query';
import { FlashList } from '@shopify/flash-list';
import {
  TaskListItem,
  TaskListProps,
} from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { LoadingAnimation } from '../Atoms/LoadingAnimation';
import { TaskShortInfoBox } from '../Molecules/TaskShortInfoBox';
import { getTasks } from '../../helpers/api/Services/Worker';

function TaskList({ ListEmptyComponent }: TaskListProps) {
  const OrderListItem = useCallback(({ item: task }: TaskListItem) => {
    return (
      <TaskShortInfoBox
        field={task.field}
        id={task.id}
        type={task.type}
        worker={task.worker}
        openedAt={task.openedAt}
        closedAt={task.closedAt}
        isDone={task.isDone}
      />
    );
  }, []);

  const { data } = useQuery('tasks', getTasks, {});
  const list = useMemo(
    () => (
      <FlashList
        onLoad={info => {
          // eslint-disable-next-line no-console
          console.log('OrdersList has been loaded in ', info);
        }}
        estimatedItemSize={130}
        ListEmptyComponent={ListEmptyComponent}
        data={data}
        keyExtractor={item => item.id}
        renderItem={OrderListItem}
        className="flex-1 h-max"
        showsVerticalScrollIndicator={false}
      />
    ),
    [data],
  );

  return (data && list) || <LoadingAnimation />;
}

const Orders = memo(
  TaskList,
  (prevProps, nextProps) =>
    prevProps.reloadIndicator === nextProps.reloadIndicator,
);

Orders.displayName = 'Orders';

// TODO this is not good way to solve this error but enough for now,
//  change in future https://stackoverflow.com/questions/60386614/how-to-use-props-with-generics-with-react-memo
export default Orders as typeof TaskList;
