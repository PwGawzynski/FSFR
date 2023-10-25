import { Text, TouchableOpacity, View } from 'react-native';
import { SmallHeader } from './SmallHeader';
import { SubOptionFilterSetterProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function SubOptionFilterSetter<T>({
  options,
  onFilterOnOff,
  filterOn,
}: SubOptionFilterSetterProps<T>) {
  return (
    <View className="flex-col items-center ">
      <SmallHeader abs="w-full items-start">{`choose ${options.main.toString()}`}</SmallHeader>
      <View
        key={Math.random()}
        style={{ gap: 10 }}
        className="h-6 flex-row justify-between items-center mb-2"
      >
        {options.subOptions?.map(value => (
          <TouchableOpacity
            onPress={() =>
              onFilterOnOff({
                main: options.main,
                subOptions: options.subOptions,
                active: { main: options.main, subOption: value.value },
              })
            }
            key={Math.random()}
            className={`flex-1 ${
              filterOn.active?.subOption === value.value
                ? 'bg-black'
                : 'bg-white'
            } h-6 border-2 border-black border-solid rounded-full items-center justify-center pl-1 pr-1`}
          >
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              className={`font-bold uppercase ${
                filterOn.active?.subOption === value.value
                  ? 'text-white'
                  : 'text-black'
              }`}
            >
              {value.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
