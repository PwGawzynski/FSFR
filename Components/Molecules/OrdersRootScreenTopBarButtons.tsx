import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import { AppButton } from '../Atoms/AppButton';
import Magnifier from '../../assets/magnifier.svg';
import { OwnerMobiOrdersTopTabProps } from '../../FrontendSelfTypes/navigation/types';

export function OrdersRootScreenTopBarButtons({
  navigation,
}: OwnerMobiOrdersTopTabProps<'ordersRoot', 'orders'>) {
  return (
    <View className="flex-1 flex items-center w-full flex-row">
      <AppButton
        action={() => console.log('History')}
        context="History"
        additionalStyles="flex-1 h-8 mr-32"
      />
      <View className="flex-1 flex-row items-center">
        <AppButton
          action={() => navigation.navigate('allOrders')}
          context="All"
          additionalStyles="flex-1 h-8 bg-[#279840]"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('ordersSearch')}
          className="h-9 w-9 rounded-full ml-4 bg-black p-2"
        >
          <Magnifier fill="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
