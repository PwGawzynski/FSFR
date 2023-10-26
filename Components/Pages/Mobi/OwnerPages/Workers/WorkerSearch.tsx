import { SafeAreaView, View } from 'react-native';
import { useState } from 'react';
import { ScreenTitleHeader } from '../../../../Atoms/ScreenTitleHeader';
import { SearchModuleInterfaceBased } from '../../../../Organisms/SearchModuleInterfaceBased';
import { Worker } from '../../../../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { WorkersList } from '../../../../Organisms/WorkersList';

export function WorkerSearch() {
  const INIT_SEARCH_VALUE = '';
  const INIT_FILTER_NAME: keyof Worker = 'surname';
  const [searchValue, setSearchValue] = useState(INIT_SEARCH_VALUE);
  const [filter, setFilter] = useState<keyof Worker>(INIT_FILTER_NAME);

  const handleOnSearchPress = (text: string) => setSearchValue(text.trim());

  return (
    <SafeAreaView className="w-full h-full flex-col">
      <View className="flex-1 mr-4 ml-4">
        <ScreenTitleHeader variant="lg">Search Worker</ScreenTitleHeader>
        <SearchModuleInterfaceBased
          onSearchPress={handleOnSearchPress}
          optionsRows={[
            ['name', 'surname'],
            ['position', 'status', 'dateOfEmployment'],
          ]}
          onFilterOnOff={filterName => setFilter(filterName)}
          filterOn={filter}
        />
        <WorkersList
          filterMethod={worker =>
            worker[filter].toString().includes(searchValue)
          }
        />
      </View>
    </SafeAreaView>
  );
}
