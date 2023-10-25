import { SafeAreaView, View } from 'react-native';
import { useState } from 'react';
import { ScreenTitleHeader } from '../../../../Atoms/ScreenTitleHeader';
import { SearchModuleInterfaceBased } from '../../../../Organisms/SearchModuleInterfaceBased';
import {
  ActiveFilterValue,
  Worker,
  WorkerPosition,
  WorkerStatus,
} from '../../../../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { WorkersList } from '../../../../Organisms/WorkersList';
import { mapEnumToSubOptionPairs } from '../../../../../helpers/handlers/mapEnumToSubOptionsPairsHandler';
import { defaultWorkerFilter } from '../../../../../helpers/handlers/workersFilterHandlers';

export function WorkerSearch() {
  const INIT_SEARCH_VALUE = '';
  const INIT_FILTER_NAME: ActiveFilterValue<Worker> = {
    main: 'surname',
    active: { main: 'surname' },
  };
  const [searchValue, setSearchValue] = useState(INIT_SEARCH_VALUE);
  const [filter, setFilter] =
    useState<ActiveFilterValue<Worker>>(INIT_FILTER_NAME);

  const handleOnSearchPress = (text: string) => setSearchValue(text.trim());
  return (
    <SafeAreaView className="w-full h-full flex-col">
      <View className="flex-1 mr-4 ml-4">
        <ScreenTitleHeader variant="lg" abs="mb-6">
          Search Worker
        </ScreenTitleHeader>
        <SearchModuleInterfaceBased
          onSearchPress={handleOnSearchPress}
          optionsRows={[
            [{ main: 'name' }, { main: 'surname' }],
            [
              {
                main: 'position',
                subOptions: mapEnumToSubOptionPairs(WorkerPosition),
              },
              {
                main: 'status',
                subOptions: mapEnumToSubOptionPairs(WorkerStatus),
              },
              { main: 'dateOfEmployment' },
            ],
          ]}
          onFilterOnOff={filterName => setFilter(filterName)}
          filterOn={filter}
        />
        <WorkersList
          filterMethod={worker =>
            defaultWorkerFilter(worker, filter, searchValue)
          }
        />
      </View>
    </SafeAreaView>
  );
}
