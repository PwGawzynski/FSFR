import { SafeAreaView, View } from 'react-native';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { HeaderWithButton } from '../../../../Atoms/HeaderWithButton';
import { OwnerMobiOrdersTopTabProps } from '../../../../../FrontendSelfTypes/navigation/types';
import { Worker } from '../../../../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { WorkerSelector } from '../../../../Organisms/WorkerSelector';
import { getAllOrdersTasks } from '../../../../../helpers/api/Services/Task';

export function OrdersManageWorkers({
  navigation,
  route,
}: OwnerMobiOrdersTopTabProps<'assignedWorkers', 'orders'>) {
  const orderId = route.params?.orderId;
  const [focusedWorker, setFocusedWorker] = useState<Worker | undefined>(
    undefined,
  );
  const { data: orderAssignedTasks, isSuccess: areTasksLoaded } = useQuery(
    ['orderAssignedTasks', orderId],
    ({ queryKey }) => getAllOrdersTasks(`${queryKey[1]}`),
  );
  return (
    <SafeAreaView className="flex grow mr-4 ml-4">
      <HeaderWithButton
        variant="lg"
        buttonAdditionalStyles="ml-4 flex-1"
        headerText="Assigned Workers"
        headerAdditionalStyles="flex-1"
        boxAdditionalStyles="mt-8"
        buttonText="Manage workers"
        onButtonClick={() =>
          navigation.navigate('assignedWorkers', { orderId })
        }
      />
      <View className="mt-4">
        <WorkerSelector
          externalData
          data={orderAssignedTasks
            ?.filter(
              orderTask =>
                orderAssignedTasks?.filter(
                  task => task.worker.id === orderTask.worker.id,
                ).length === 1,
            )
            ?.map(orderTask => orderTask.worker)}
          focusedWorker={focusedWorker}
          setFocusedWorker={setFocusedWorker}
        />
      </View>
      <View className="grow" />
    </SafeAreaView>
  );
}
