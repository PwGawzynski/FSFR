import { SafeAreaView, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
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
  const { data: orderAssignedTasks } = useQuery(
    ['orderAssignedTasks', orderId],
    ({ queryKey }) => getAllOrdersTasks(`${queryKey[1]}`),
  );
  const [selectedWorkerTasks, setSelectedWorkerTasks] = useState<
    Array<OrderTask> | undefined
  >(undefined);
  useEffect(() => {
    if (focusedWorker && orderAssignedTasks)
      setSelectedWorkerTasks(
        orderAssignedTasks.filter(
          orderTask => orderTask.worker.id === focusedWorker.id,
        ),
      );
  }, [focusedWorker]);

  const OrderAssignedWorkerSelector = useMemo(
    () =>
      orderAssignedTasks && (
        <WorkerSelector
          externalData
          data={
            orderAssignedTasks && getExplicitWorkersEntities(orderAssignedTasks)
          }
          onFocusWorker={worker => setFocusedWorker(worker)}
        />
      ),
    [orderAssignedTasks],
  );

  const selectedWorkerTasksList = useMemo(
    () =>
      selectedWorkerTasks && <WorkersTasksList data={selectedWorkerTasks} />,
    [selectedWorkerTasks],
  );

  return (
    <SafeAreaView className="w-full h-full bg-white">
      <View className="flex h-full ml-2 mr-2">
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
        <View className="mt-4">{OrderAssignedWorkerSelector}</View>
        <ScreenTitleHeader variant="sm" abs="mt-6 mb-4">
          {focusedWorker?.name} Task&apos;s
        </ScreenTitleHeader>
        <View className="flex-1">{selectedWorkerTasksList}</View>
      </View>
    </SafeAreaView>
  );
}
