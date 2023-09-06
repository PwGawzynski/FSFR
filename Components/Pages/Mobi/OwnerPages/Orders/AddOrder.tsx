import { SafeAreaView, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { useMutation } from 'react-query';
import {
  NewClientShortCreateI,
  NewOrderI,
  TaskType,
} from '../../../../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { addNewOrder } from '../../../../../helpers/api/Services/OrdersService';
import { OwnerMobiOrdersTopTabProps } from '../../../../../FrontendSelfTypes/navigation/types';
import { AddNewClientShortService } from '../../../../../helpers/api/Services/Client';
import { useValidation } from '../../../../../helpers/hooks/validationHook';
import {
  AddNewClientShortSchema,
  AddOrderSchema,
  AddOrderSchemaI,
} from '../../../../../helpers/validation/mobileSchemas/AddOrderSchema';
import { AddOrderAndClientForm } from '../../../../Organisms/AddOrderAndClientForm';
import { AddOrderErrorInfo } from '../../../../Atoms/AddOrderErrorInfo';

const initOrder = (): NewOrderI => ({
  name: '',
  client: '',
  additionalInfo: '',
  type: TaskType.Harvesting,
  performanceDate: '',
});
const initClient = (): NewClientShortCreateI => ({
  name: '',
  phoneNumber: '',
  email: '',
});
export function AddOrder({
  navigation,
}: OwnerMobiOrdersTopTabProps<'addOrder', 'orders'>) {
  const {
    isSuccess: hasOrderBeenAdded,
    mutate: createNewOrder,
    isError: isNewOrderError,
    error: newOrderErrorValue,
  } = useMutation(addNewOrder);

  const { isSuccess: isClientMutationSuccess, mutate: createClient } =
    useMutation(AddNewClientShortService);

  /*
  order and client data must be cleared after mutation success but
  using only setSate with new {} with empty strings don't work properly
  we have to store this init objects in use memo to give always new objects
  */
  const initOrderValue = useMemo(initOrder, [hasOrderBeenAdded]);
  const initClientValue = useMemo(initClient, [hasOrderBeenAdded]);

  const [newOrder, setNewOrder] = useState<NewOrderI>(initOrderValue);
  const [newClient, setNewClient] =
    useState<NewClientShortCreateI>(initClientValue);
  const [btnClicked, setBtnClicked] = useState<boolean>(false);

  const [validator, setCanValidate] = useValidation<AddOrderSchemaI>(
    newOrder,
    AddOrderSchema,
    [btnClicked],
  );
  const [clientValidator, setCanValidateClient] =
    useValidation<NewClientShortCreateI>(newClient, AddNewClientShortSchema, [
      btnClicked,
    ]);

  // after client mutation mutate order
  useEffect(() => {
    if (isClientMutationSuccess) {
      createNewOrder(newOrder);
    }
  }, [isClientMutationSuccess]);

  // check if validation order is correct then mutate order
  useEffect(() => {
    if (!validator.isError && btnClicked) {
      createNewOrder(newOrder);
    }
  }, [validator, btnClicked]);

  /* check if client validation is correct then mutate client, this validation only has place
  when newClientData has even one string longer then 0 */
  useEffect(() => {
    if (!clientValidator.isError && !validator.isError && btnClicked) {
      createClient(newClient);
    }
  }, [clientValidator, validator, btnClicked]);

  // after validation clear all states and navi to confirmation
  useEffect(() => {
    if (hasOrderBeenAdded) {
      setNewOrder(initOrderValue);
      setNewClient(initClientValue);
      navigation.navigate('OperationConfirmed', {
        redirectScreenName: 'ordersRoot',
        shownMessage: 'Order Has Been Added',
      });
      setCanValidate(true);
      setBtnClicked(false);
    }
  }, [hasOrderBeenAdded]);

  return (
    <SafeAreaView className="w-full h-full">
      <View className="flex flex-col mr-4 ml-4 mt-4 w-max h-full">
        <AddOrderErrorInfo
          isNewOrderError={isNewOrderError}
          newOrderErrorValue={newOrderErrorValue}
          btnClicked={btnClicked}
          clientValidator={clientValidator}
          validator={validator}
        />
        <AddOrderAndClientForm
          setNewClient={setNewClient}
          newClient={newClient}
          setNewOrder={setNewOrder}
          newOrder={newOrder}
          setCanValidateClient={setCanValidateClient}
          setCanValidate={setCanValidate}
          setBtnClicked={setBtnClicked}
        />
      </View>
    </SafeAreaView>
  );
}
