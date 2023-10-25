import { Text, TouchableOpacity, View } from 'react-native';
import { SmallHeader } from './SmallHeader';
import { FiltersSetterProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function FiltersSetter<T>({
  optionsRows,
  onFilterOnOff,
  filterOn,
}: FiltersSetterProps<T>) {
  return (
    <View className="flex-col items-center mb-8">
      <SmallHeader abs="w-full items-start">Filters</SmallHeader>
      {optionsRows.map(option => (
        <View
          key={Math.random()}
          style={{ gap: 10 }}
          className="h-6 flex-row justify-between items-center mb-2"
        >
          {option.map(value => (
            <TouchableOpacity
              onPress={() =>
                onFilterOnOff({
                  main: value.main,
                  subOptions: value.subOptions,
                  active: {
                    main: value.main,
                  },
                })
              }
              key={Math.random()}
              className={`flex-1 ${
                filterOn.main === value.main ? 'bg-black' : 'bg-white'
              } h-6 border-2 border-black border-solid rounded-full items-center justify-center pl-1 pr-1`}
            >
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                className={`font-bold uppercase ${
                  filterOn.main === value.main ? 'text-white' : 'text-black'
                }`}
              >
                {value.main as string}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}
