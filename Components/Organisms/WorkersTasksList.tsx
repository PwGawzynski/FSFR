import { FlatList } from 'react-native';
import { WorkersTaskList } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { WorkersTaskListElement } from '../Molecules/WorkersTaskListElement';

export function WorkersTasksList({ data }: WorkersTaskList) {
  return (
    <FlatList
      className=""
      data={data}
      renderItem={({ item, index }) =>
        WorkersTaskListElement({ ...item, index })
      }
    />
  );
}
