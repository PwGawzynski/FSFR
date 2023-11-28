import { SafeAreaView, Text, View } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import { WorkerDesktopStackProps } from '../../../../FrontendSelfTypes/navigation/types';
import { ScreenTitleHeader } from '../../../Atoms/ScreenTitleHeader';
import { TaskType } from '../../../../FarmServiceTypes/Task/Enums';
import { TitleValueInfoComponent } from '../../../Atoms/TitleValueInfoComponent';
import { SmallHeader } from '../../../Molecules/SmallHeader';
import { LineDivider } from '../../../Atoms/LineDivider';
import Timer from '../../../Molecules/Timer';
import { AppButton } from '../../../Atoms/AppButton';
import {
  AppSettings,
  ModalState,
} from '../../../../helpers/appSettings/contexts';
import { closeTask, openTask } from '../../../../helpers/api/Services/Worker';

enum TaskState {
  open,
  closing,
  closed,
}

export function Task({ route }: WorkerDesktopStackProps<'desktop', 'task'>) {
  const { task } = route.params;
  const [isOpened, setIsOpened] = useState<TaskState>(
    task?.closedAt ? TaskState.closed : TaskState.open,
  );

  const nav = useNavigation<any>();

  const { setModalContext } = useContext(AppSettings).setters;

  const { mutate: openTaskAsk, isSuccess: opened } = useMutation(openTask);
  const { mutate: closeTaskAsk, isSuccess: closed } = useMutation(closeTask);

  useEffect(() => {
    if (closed)
      nav.navigate('OperationConfirmed', {
        redirectScreenName: 'root',
        shownMessage: `Confirm Closing`,
      });
    if (opened) {
      console.log('ter');
      setIsOpened(TaskState.open);
    }
  }, [closed, opened]);

  useEffect(() => {
    if (isOpened === TaskState.closing) {
      setModalContext({
        isOn: ModalState.on,
        context: 'Confirm close operation !!!',
        onApproveCallback: () => {
          if (task?.id) closeTaskAsk(task.id);
        },
        onDisapproveCallback: () => setIsOpened(TaskState.open),
        customApproveButtonText: 'Confirm',
        customDisapproveButtonText: 'Regret',
      });
    }
  }, [isOpened]);

  console.log(isOpened);
  return task ? (
    <SafeAreaView className="w-full h-full">
      <View className="flex-1 flex-col mr-4 ml-4">
        <ScreenTitleHeader variant="lg">
          {TaskType[task.type]} {task.field.address.city}
        </ScreenTitleHeader>
        <View className="mt-12">
          <SmallHeader>Task Info</SmallHeader>
          <LineDivider abs="m-0" />
          <TitleValueInfoComponent
            titles={['id', 'commissioned on :']}
            keys={[
              `${task.id.split('-')[4]}`,
              task.openedAt
                ? new Date(task.openedAt).toLocaleDateString()
                : undefined,
            ]}
          />
        </View>

        <View className="mt-12">
          <SmallHeader>Field Info</SmallHeader>
          <LineDivider abs="m-0" />
          <TitleValueInfoComponent
            titles={['commissioned on :', 'area', 'PLID']}
            keys={[
              task.openedAt
                ? new Date(task.openedAt).toLocaleDateString()
                : undefined,
              `${task.field.area} Ha`,
              task.field.polishSystemId,
            ]}
          />
        </View>

        <View className="flex-1 flex-col mt-12 mb-24">
          {isOpened === TaskState.open && (
            <Timer targetDate={task.openedAt as unknown as string} />
          )}
          <View className="flex-1 items-center justify-center">
            {isOpened === TaskState.closed && (
              <AppButton
                abs={` bg-[#279840]`}
                action={() => {
                  openTaskAsk(task?.id);
                }}
                context="OPEN"
              />
            )}
            {isOpened === TaskState.open && (
              <AppButton
                abs="bg-[#f00]"
                action={() => {
                  setIsOpened(TaskState.closing);
                }}
                context="close"
              />
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  ) : (
    <View />
  );
}
