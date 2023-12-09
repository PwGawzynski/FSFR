import { SafeAreaView, View } from 'react-native';
import { useMutation, useQuery } from 'react-query';
import { useCallback, useEffect, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { List, RadioButton } from 'react-native-paper';
import { OwnerMobiOrdersTopTabProps } from '../../../../../FrontendSelfTypes/navigation/types';
import { getMachines } from '../../../../../helpers/api/Services/Company';
import { MachineResponseBase } from '../../../../../FarmServiceTypes/Machine/Responses';
import { ScreenTitleHeader } from '../../../../Atoms/ScreenTitleHeader';
import { AppButton } from '../../../../Atoms/AppButton';
import { assignMachine } from '../../../../../helpers/api/Services/Machine';
import { getMachinesByTask } from '../../../../../helpers/api/Services/Task';

interface SingleItem {
  // eslint-disable-next-line react/no-unused-prop-types
  item: MachineResponseBase;
}

export function AddMachine({
  navigation,
  route: {
    params: { taskId, orderId },
  },
}: OwnerMobiOrdersTopTabProps<'AddMachine', 'orders'>) {
  const { data } = useQuery('machines', getMachines);
  const [selected, setSelected] = useState<Array<string>>([]);

  const { data: assignedMachines } = useQuery(
    ['assignedMachines', taskId],
    context => {
      if (context.queryKey[1]) {
        return getMachinesByTask(context.queryKey[1]);
      }
      return undefined;
    },
  );
  useEffect(() => {
    if (assignedMachines)
      setSelected(prevState => [
        ...new Set([...prevState, ...assignedMachines.map(m => m.id)]),
      ]);
  }, [assignedMachines]);
  const { mutate, isSuccess } = useMutation('assignMachines', assignMachine);

  useEffect(() => {
    if (isSuccess)
      navigation.navigate('OperationConfirmed', {
        redirectScreenName: 'ordersManageWorkers',
        shownMessage: `Machines assigned`,
        goBack: true,
        payload: { orderId },
      });
  }, [isSuccess]);

  const SingleMachine = useCallback(
    ({ item }: SingleItem) => {
      return (
        <List.Item
          title={item.name}
          titleStyle={{ color: '#000' }}
          descriptionStyle={{ color: '#848484' }}
          description={item.licensePlate}
          right={() => (
            <RadioButton
              value="s"
              status={
                selected.find(id => {
                  return id === item.id;
                })
                  ? 'checked'
                  : 'unchecked'
              }
              onPress={() => {
                if (selected.find(machineId => machineId === item.id)) {
                  setSelected(prevState => [
                    ...prevState.filter(machineId => machineId !== item.id),
                  ]);
                  return;
                }
                setSelected(prev => [...new Set([...prev, item.id])]);
              }}
              uncheckedColor="#000"
              color="#000"
            />
          )}
        />
      );
    },
    [selected],
  );

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 mr-4 ml-4">
        <ScreenTitleHeader variant="sm">Machines</ScreenTitleHeader>
        <FlashList
          keyExtractor={item => item.id}
          data={data}
          extraData={selected}
          renderItem={SingleMachine}
          estimatedItemSize={73}
        />
        <AppButton
          action={() => {
            if (selected.length && taskId)
              mutate({
                taskId,
                machines: selected,
              });
          }}
          context="Assign Machines"
        />
      </View>
    </SafeAreaView>
  );
}
