import { SafeAreaView, View } from 'react-native';
import { useState } from 'react';
import { ScreenTitleHeader } from '../../../../Atoms/ScreenTitleHeader';
import { SearchModuleInterfaceBased } from '../../../../Organisms/SearchModuleInterfaceBased';
import { ActiveFilterValue } from '../../../../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { WorkersList } from '../../../../Organisms/WorkersList';
import { mapEnumToSubOptionPairs } from '../../../../../helpers/handlers/mapEnumToSubOptionsPairsHandler';
import { defaultWorkerFilter } from '../../../../../helpers/handlers/workersFilterHandlers';
import { Position, Status } from '../../../../../FarmServiceTypes/Worker/Enums';
import { WorkerResponseBase } from '../../../../../FarmServiceTypes/Worker/Responses';
import { PersonalDataBase } from '../../../../../FarmServiceTypes/UserPersonalData/Responses';

export function WorkerSearch() {
  const INIT_SEARCH_VALUE = '';
  const INIT_FILTER_NAME: ActiveFilterValue<WorkerResponseBase> = {
    main: 'personalData',
    active: { main: 'personalData', subOption: 'surname' },
  };
  const [searchValue, setSearchValue] = useState(INIT_SEARCH_VALUE);
  const [filter, setFilter] =
    useState<ActiveFilterValue<WorkerResponseBase>>(INIT_FILTER_NAME);

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
            [
              {
                main: 'name',
              },
              {
                main: 'surname',
              },

              {
                main: 'phoneNumber',
              },
            ],
            [
              {
                main: 'position',
                subOptions: mapEnumToSubOptionPairs(Position),
              },
              {
                main: 'status',
                subOptions: mapEnumToSubOptionPairs(Status),
              },
            ],
          ]}
          onFilterOnOff={filterName => setFilter(filterName)}
          filterOn={filter}
        />
        <WorkersList
          reloadIndicator={`${searchValue}${
            filter && filter.active ? filter.active.subOption : ''
          }`}
          filterMethod={worker =>
            defaultWorkerFilter(worker, filter, searchValue)
          }
        />
      </View>
    </SafeAreaView>
  );
}
