import { Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { useMutation } from 'react-query';
import { WorkerSelector } from './WorkerSelector';
import { ScreenTitleHeader } from '../Atoms/ScreenTitleHeader';
import { SelectWorkerPanelProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { AppButton } from '../Atoms/AppButton';
import { addNewTask } from '../../helpers/api/Services/Task';
import { WorkerResponseBase } from '../../FarmServiceTypes/Worker/Responses';
import { TaskType } from '../../FarmServiceTypes/Task/Enums';

export function SelectWorkerPanel({
  fieldsIds,
  navigation,
  validationError,
  setValidationError,
  orderId,
}: SelectWorkerPanelProps) {
  const [focusedWorker, setFocusedWorker] = useState<
    WorkerResponseBase | undefined
  >(undefined);

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
      <View style={{ height: 80 }} className="flex-row">
        <WorkerSelector onFocusWorker={setFocusedWorker} />
      </View>
      {focusedWorker && (
        <View className="grow">
          <ScreenTitleHeader ats="text-base" variant="sm">
            Worker {focusedWorker?.personalData.name}
          </ScreenTitleHeader>
          <RNPickerSelect
            onValueChange={(v, i) => setTaskType(i - 1)}
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
              if (!fieldsIds.length || taskType === undefined)
                setValidationError(true);
              else
                createNewTasks(
                  fieldsIds.map(fieldId => ({
                    worker: focusedWorker?.id,
                    order: orderId,
                    field: fieldId,
                    type: taskType,
                  })),
                );
            }}
            context="Assign selected Tasks"
          />
        </View>
      )}
    </View>
  );
}
