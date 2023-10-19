import { SafeAreaView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { HeaderWithButton } from '../../../../Atoms/HeaderWithButton';
import { OwnerMobiOrdersTopTabProps } from '../../../../../FrontendSelfTypes/navigation/types';
import {
  OrderTask,
  Worker,
} from '../../../../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { WorkerSelector } from '../../../../Organisms/WorkerSelector';
import { getAllOrdersTasks } from '../../../../../helpers/api/Services/Task';
import { WorkersTasksList } from '../../../../Organisms/WorkersTasksList';
import { ScreenTitleHeader } from '../../../../Atoms/ScreenTitleHeader';

const getExplicitWorkersEntities = (orderAssignedTasks: Array<OrderTask>) => {
  const filtered: Array<Worker> = [];
  orderAssignedTasks.forEach(
    orderTask =>
      !filtered.find(worker => worker.id === orderTask.worker.id) &&
      filtered.push(orderTask.worker),
  );
  return filtered;
};

export function OrdersManageWorkers({
  navigation,
  route,
}: OwnerMobiOrdersTopTabProps<'ordersManageWorkers', 'orders'>) {
  const orderId = route.params?.orderId;
  const [focusedWorker, setFocusedWorker] = useState<Worker | undefined>(
    undefined,
  );
  const { data: orderAssignedTasks, isSuccess: areTasksLoaded } = useQuery(
    ['orderAssignedTasks', orderId],
    ({ queryKey }) => getAllOrdersTasks(`${queryKey[1]}`),
  );
  const [selectedWorkerTasks, setSelectedWorkerTasks] = useState<
    Array<OrderTask> | undefined
  >(undefined);
  console.log(orderAssignedTasks, 'TASKS');
  useEffect(() => {
    if (focusedWorker && orderAssignedTasks)
      setSelectedWorkerTasks(
        orderAssignedTasks.filter(
          orderTask => orderTask.worker.id === focusedWorker.id,
        ),
      );
  }, [focusedWorker]);
  return (
    <SafeAreaView className="w-full h-full  bg-white">
      <View className="flex  ml-2 mr-2">
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
            data={
              orderAssignedTasks &&
              getExplicitWorkersEntities(orderAssignedTasks)
            }
            focusedWorker={focusedWorker}
            setFocusedWorker={setFocusedWorker}
          />
        </View>
        <ScreenTitleHeader variant="sm" abs="mt-6 mb-4">
          {focusedWorker?.name} Task&apos;s
        </ScreenTitleHeader>
        {selectedWorkerTasks && <WorkersTasksList data={selectedWorkerTasks} />}
        <View className="grow" />
      </View>
    </SafeAreaView>
  );
}
