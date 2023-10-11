import { FiltersSetter } from '../Molecules/FiltersSetter';
import { SearchModuleInterfaceBasedProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { SearchEngine } from './SearchEngine';

export function SearchModuleInterfaceBased<T>({
  filterOn,
  onFilterOnOff,
  optionsRows,
  onSearchPress,
  onChangeText,
  value,
}: SearchModuleInterfaceBasedProps<T>) {
  return (
    <>
      <FiltersSetter<T>
        onFilterOnOff={onFilterOnOff}
        filterOn={filterOn}
        optionsRows={optionsRows}
      />
      <SearchEngine
        onSearchPress={onSearchPress}
        onChangeText={onChangeText}
        value={value}
      />
    </>
  );
}
