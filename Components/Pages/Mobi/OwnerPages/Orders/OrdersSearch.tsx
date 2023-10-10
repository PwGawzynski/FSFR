import { SafeAreaView, View } from 'react-native';
import { useState } from 'react';
import { ScreenTitleHeader } from '../../../../Atoms/ScreenTitleHeader';
import { SearchEngine } from '../../../../Organisms/SearchEngine';
import { OwnerMobiOrdersTopTabProps } from '../../../../../FrontendSelfTypes/navigation/types';
import { OrdersList } from '../../../../Organisms/OrdersList';
import { EmptyListInfo } from '../../../../Molecules/EmptyListInfo';
import EmptyIco from '../../../../../assets/empty.svg';

export function OrdersSearch({
  route,
  navigation,
}: OwnerMobiOrdersTopTabProps<'ordersSearch', 'orders'>) {
  const INITI_SEARCH_VALUE = '';
  const [searchValue, setSearchValue] = useState(INITI_SEARCH_VALUE);
  return (
    <SafeAreaView className="flex-col h-full justify-center mr-4 ml-4 ">
      <ScreenTitleHeader
        variant="lg"
        additionalStyles="w-full justify-start mb-4"
      >
        Search Order
      </ScreenTitleHeader>
      <SearchEngine onSearchPress={text => setSearchValue(text)} />
      <View className="flex-1 mt-8">
        <OrdersList
          ListEmptyComponent={
            <EmptyListInfo text="Nothing to see here...">
              <EmptyIco width={100} style={{ width: 100, height: 100 }} />
            </EmptyListInfo>
          }
          navigation={navigation}
          route={route}
          filterMethod={order =>
            searchValue === INITI_SEARCH_VALUE
              ? true
              : order.client.toLowerCase().includes(searchValue.toLowerCase())
          }
          reloadIndicator={searchValue}
        />
      </View>
    </SafeAreaView>
  );
}
