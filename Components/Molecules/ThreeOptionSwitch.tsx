import { Text, TouchableOpacity, View } from 'react-native';
import { ThreeOptionSwitchProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function ThreeOptionSwitch({ options, setter }: ThreeOptionSwitchProps) {
  return (
    <View className="flex flex-1 flex-row max-h-6  rounded border-solid border-black border-2 items-center ml-4">
      <TouchableOpacity
        onPress={() =>
          setter(prevState => ({
            ...prevState,
            firstOptionState: !prevState.firstOptionState,
          }))
        }
        className={`flex-1 border-r-2 h-full p-1 ${
          options.firstOptionState && 'bg-black'
        }`}
      >
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          className={`text-black text-center uppercase font-bold align-middle  ${
            options.firstOptionState && 'text-white'
          }`}
        >
          {options.firstOptionName}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          setter(prevState => ({
            ...prevState,
            secondOptionState: !prevState.secondOptionState,
          }))
        }
        className={`flex-1 p-1 h-full ${
          options.secondOptionState && 'bg-black'
        }`}
      >
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          className={`text-black text-center uppercase font-bold  align-middle ${
            options.secondOptionState && 'text-white'
          }`}
        >
          {options.secondOptionName}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          setter(prevState => ({
            ...prevState,
            thirdOptionState: !prevState.thirdOptionState,
          }))
        }
        className={`flex-1 border-l-2 h-full p-1 ${
          options.thirdOptionState && 'bg-black'
        }`}
      >
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          className={`text-black text-center uppercase  h-full font-bold align-middle ${
            options.thirdOptionState && 'text-white'
          }`}
        >
          {options.thirdOptionName}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
