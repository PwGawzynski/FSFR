import { SafeAreaView, View } from 'react-native';
import React, { useState } from 'react';
import { OwnerOrdersMaterialRootProps } from '../../../../../FrontendSelfTypes/navigation/types';
import { HeaderWithButton } from '../../../../Atoms/HeaderWithButton';
import { AddOrderForm } from '../../../../Organisms/AddOrderForm';

export function AddOrder({
  navigation,
}: OwnerOrdersMaterialRootProps<'addOrder', 'ordersRoot', 'orders'>) {
  const [reset, setReset] = useState(false);

  return (
    <SafeAreaView className="w-full h-full">
      <View className="flex-1 flex-col mr-4 ml-4">
        <HeaderWithButton
          variant="lg"
          buttonText="reset"
          headerText="add new order"
          onButtonClick={() => setReset(pr => !pr)}
          buttonAdditionalStyles="ml-12"
        />
        <AddOrderForm navigation={navigation} resetToggle={reset} />
      </View>
    </SafeAreaView>
  );
}
