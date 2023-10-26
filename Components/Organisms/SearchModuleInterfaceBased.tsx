import { FiltersSetter } from '../Molecules/FiltersSetter';
import { SearchModuleInterfaceBasedProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { SearchEngine } from './SearchEngine';
import { SubOptionFilterSetter } from '../Molecules/SubOptionFilterSetter';

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
      {!filterOn.active ||
        (!filterOn.subOptions && (
          <SearchEngine
            onSearchPress={onSearchPress}
            onChangeText={onChangeText}
            value={value}
          />
        ))}
      {filterOn.subOptions && (
        <SubOptionFilterSetter
          options={filterOn}
          onFilterOnOff={onFilterOnOff}
          filterOn={filterOn}
        />
      )}
    </>
  );
}
