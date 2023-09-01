import { SafeAreaView, View } from 'react-native';
import { useEffect, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useMutation } from 'react-query';
import { AppInput } from '../../../../Molecules/AppInput';
import {
  NewClientShortCreateI,
  NewOrderI,
  TaskType,
} from '../../../../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { ScreenTitleHeader } from '../../../../Atoms/ScreenTitleHeader';
import { OrLabel } from '../../../../Atoms/OrLabel';
import { InfoText } from '../../../../Atoms/InfoText';
import { addNewOrder } from '../../../../../helpers/api/Services/OrdersService';
import { OwnerMobiOrdersTopTabProps } from '../../../../../FrontendSelfTypes/navigation/types';
import { AppButton } from '../../../../Atoms/AppButton';
import { AddNewClientShortService } from '../../../../../helpers/api/Services/Client';

export function AddOrder({
  navigation,
}: OwnerMobiOrdersTopTabProps<'addOrder', 'orders'>) {
  const [newOrder, setNewOrder] = useState<NewOrderI>({
    name: '',
    client: '',
    additionalInfo: '',
    type: TaskType.Harvesting,
    performanceDate: '',
  });

  const [newClient, setNewClient] = useState<NewClientShortCreateI>({
    name: '',
    phoneNumber: '',
    email: '',
  });

  const { isSuccess: hasOrderBeenAdded, mutate: createNewOrder } =
    useMutation(addNewOrder);

  const { isSuccess: isClientMutatioSuccess, mutate: createClient } =
    useMutation(AddNewClientShortService);

  useEffect(() => {
    if (hasOrderBeenAdded) {
      navigation.navigate('OperationConfirmed', {
        redirectScreenName: 'ordersRoot',
        shownMessage: 'Order Has Been Added',
      });
    }
  }, [hasOrderBeenAdded]);

  useEffect(() => {
    if (isClientMutatioSuccess) {
      createNewOrder(newOrder);
    }
  }, [isClientMutatioSuccess]);

  return (
    <SafeAreaView className="w-full h-full">
      <View className="flex flex-col mr-4 ml-4 mt-4 w-max h-full">
        <View className="flex-1 grow w-full">
          <ScreenTitleHeader variant="lg">Add Order</ScreenTitleHeader>
        </View>
        <KeyboardAwareScrollView
          className="flex flex-1 grow-[11] flex-col  w-full"
          showsVerticalScrollIndicator={false}
        >
          <AppInput
            setter={setNewOrder}
            ObjectKey="name"
            value={newOrder.name}
            underlyingLabel="Task Name"
            additionalStyles="flex-1 justify-end"
            additionalTextStyles="h-max"
          />
          <AppInput
            setter={setNewOrder}
            ObjectKey="additionalInfo"
            value={newOrder.additionalInfo}
            underlyingLabel="Additional Info"
            additionalStyles="grow justify-end "
          />
          <AppInput
            setter={setNewOrder}
            ObjectKey="performanceDate"
            value={newOrder.performanceDate}
            underlyingLabel="Performance Date"
            additionalStyles="flex-1 justify-end "
          />
          <AppInput
            setter={setNewOrder}
            ObjectKey="client"
            value={newOrder.client}
            underlyingLabel="Client"
            additionalStyles="flex-1 justify-end "
          />
          <View className="flex-1 max-h-12 pb-4 border-solid border-b-4 mt-4 mb-8 order-2 justify-end">
            <RNPickerSelect
              onValueChange={(v, i) =>
                setNewOrder((prevState: NewOrderI) => ({
                  ...prevState,
                  type: i,
                }))
              }
              items={(
                Object.values(TaskType).filter(e =>
                  Number.isNaN(Number(e)),
                ) as Array<string>
              ).map((name: string) => ({
                label: name,
                value: name,
              }))}
            />
          </View>
          <OrLabel />
          <InfoText additionalStyles="text-left text-base font-bold uppercase mt-8">
            Create New Client in Short Way
          </InfoText>
          <AppInput
            setter={setNewClient}
            ObjectKey="name"
            value={newClient.name}
            underlyingLabel="Name"
            additionalStyles="flex-1 justify-end "
          />
          <AppInput
            setter={setNewClient}
            ObjectKey="phoneNumber"
            value={newClient.phoneNumber}
            keyboardType="phone-pad"
            underlyingLabel="Phone Number"
            additionalStyles="flex-1 justify-end "
          />
          <AppInput
            setter={setNewClient}
            ObjectKey="email"
            value={newClient.email}
            underlyingLabel="Email"
            additionalStyles="flex-1 justify-end "
          />
          <AppButton
            action={() => {
              if (
                !(
                  newClient.name.length ||
                  newClient.phoneNumber.length ||
                  newClient.email.length
                )
              ) {
                createNewOrder(newOrder);
                return;
              }
              createClient(newClient);
            }}
            context="Create"
            additionalStyles="mt-4 mb-8 flex-1"
          />
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}
