import { Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { useMutation } from 'react-query';
import { WorkerSelector } from './WorkerSelector';
import { ScreenTitleHeader } from '../Atoms/ScreenTitleHeader';
import {
  SelectWorkerPanelProps,
  TaskType,
  Worker,
} from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { AppButton } from '../Atoms/AppButton';
import { addNewTask } from '../../helpers/api/Services/Task';

export function SelectWorkerPanel({
  fieldsIds,
  navigation,
  validationError,
  setValidationError,
}: SelectWorkerPanelProps) {
  const [focusedWorker, setFocusedWorker] = useState<Worker | undefined>(
    undefined,
  );
  const [taskType, setTaskType] = useState<number | undefined>();
  const { mutate: createNewTasks, isSuccess } = useMutation(addNewTask);

  useEffect(() => {
    if (isSuccess)
      navigation.navigate('OperationConfirmed', {
        redirectScreenName: 'ordersRoot',
        shownMessage: `It's done, tasks has been assigned to your employee`,
      });
  }, [isSuccess]);

  useEffect(() => {
    if (validationError) {
      const timeoutId = setTimeout(() => setValidationError(false), 1000);
      return () => clearInterval(timeoutId);
    }
    return undefined;
  }, [validationError]);

  return (
    <View className="flex-col justify-start mt-4">
      <WorkerSelector
        focusedWorker={focusedWorker}
        setFocusedWorker={setFocusedWorker}
      />
      {focusedWorker && (
        <View className="grow">
          <ScreenTitleHeader ats="text-base" variant="sm">
            Worker {focusedWorker?.name}
          </ScreenTitleHeader>
          <RNPickerSelect
            onValueChange={(v, i) => setTaskType(i)}
            style={{
              placeholder: {
                color: validationError ? 'red' : '#808080',
              },
            }}
            items={(
              Object.values(TaskType).filter(e =>
                Number.isNaN(Number(e)),
              ) as Array<string>
            ).map((name: string) => ({
              label: name,
              value: name,
            }))}
          />
          <View className="flex flex-row h-4 rounded-full overflow-hidden bg-amber-50 mt-4">
            <View className="flex-1 bg-[#279840]" />
            <View className="flex-1" />
          </View>
          <Text className="ml-1 text-xs">Employee Workload</Text>
          <AppButton
            abs="mt-4"
            action={() => {
              if (!fieldsIds.length || !taskType) setValidationError(true);
              else
                createNewTasks({
                  workerId: focusedWorker?.id,
                  type: taskType,
                  fieldsIds,
                });
            }}
            context="Assign selected Tasks"
          />
        </View>
      )}
    </View>
  );
}
