import { Text, TouchableOpacity } from 'react-native';
import { ProfilePhoto } from '../Atoms/ProfilePhoto';
import { WorkerSelectorItemProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function WorkerSelectorItem({
  worker,
  setFocusedWorker,
  onFocusWorker,
  focusedWorker,
}: WorkerSelectorItemProps) {
  console.log(focusedWorker?.id === worker.id);
  return (
    <TouchableOpacity
      onPress={() => {
        setFocusedWorker(worker);
        onFocusWorker(worker);
      }}
      style={{ height: 80, width: 60 }}
      className="flex flex-col items-center justify-center"
      key={worker.id}
    >
      <ProfilePhoto
        imgLink={worker.photoUrl}
        focused={worker.id === focusedWorker?.id}
        abs="w-[55] h-[55]"
      />
      <Text className="mt-1">{worker.name}</Text>
    </TouchableOpacity>
  );
}
