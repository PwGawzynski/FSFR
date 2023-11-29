import { SafeAreaView, View } from 'react-native';
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
import { TaskResponseBase } from '../../../../FarmServiceTypes/Task/Restonses';

enum TaskState {
  notOpenNotClosed,
  preOpen,
  openNotClosed,
  preClosed,
  openClosed,
  err,
}

function setTaskState(task: TaskResponseBase | undefined) {
  if (task) {
    const openedAt = !!task.openedAt;
    const closedAt = !!task.closedAt;
    if (!openedAt && !closedAt) return TaskState.notOpenNotClosed;
    if (openedAt && !closedAt) return TaskState.openNotClosed;
    if (openedAt && closedAt) return TaskState.openClosed;
  }
  return TaskState.err;
}

export function Task({ route }: WorkerDesktopStackProps<'desktop', 'task'>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nav = useNavigation<any>();
  const { task } = route.params;

  const [isOpened, setIsOpened] = useState<TaskState>(setTaskState(task));

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
      setIsOpened(TaskState.openNotClosed);
    }
  }, [closed, opened]);
  useEffect(() => {
    if (isOpened === TaskState.preClosed) {
      setModalContext({
        isOn: ModalState.on,
        context: 'Confirm close operation !!!',
        onApproveCallback: () => {
          if (task?.id) closeTaskAsk(task.id);
        },
        onDisapproveCallback: () => setIsOpened(TaskState.openClosed),
        customApproveButtonText: 'Confirm',
        customDisapproveButtonText: 'Regret',
      });
    }
    if (isOpened === TaskState.preOpen && task?.closedAt) {
      setModalContext({
        isOn: ModalState.on,
        context: 'This task has already been closed, do you want to reopen ?',
        onApproveCallback: () => {
          setIsOpened(TaskState.openNotClosed);
        },
        onDisapproveCallback: () => '',
        customApproveButtonText: 'Confirm',
        customDisapproveButtonText: 'Regret',
      });
    }
    if (isOpened === TaskState.preOpen && !task?.closedAt && task?.id) {
      openTaskAsk(task.id);
    }
  }, [isOpened]);

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
          {isOpened === TaskState.openNotClosed && (
            <Timer
              targetDate={
                task.openedAt
                  ? (task.openedAt as unknown as string)
                  : new Date()
              }
            />
          )}
          <View className="flex-1 items-center justify-center">
            {(isOpened === TaskState.notOpenNotClosed ||
              isOpened === TaskState.openClosed) && (
              <AppButton
                abs={` bg-[#279840]`}
                action={() => {
                  setIsOpened(TaskState.preOpen);
                }}
                context="OPEN"
              />
            )}
            {isOpened === TaskState.openNotClosed && (
              <AppButton
                abs="bg-[#f00]"
                action={() => {
                  setIsOpened(TaskState.preClosed);
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
