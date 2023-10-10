import { TextInput, View } from 'react-native';
import { useState } from 'react';
import { MagnifierButton } from '../Molecules/MagnifierButton';
import { searchEngineProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function SearchEngine({
  onSearchPress,
  onChangeText,
  value,
}: searchEngineProps) {
  const [searchValue, setSearchValue] = useState('');
  return (
    <View className="flex-row justify-between w-max items-center">
      <View className="h-10 flex-1 border-2 border-black border-solid rounded-full justify-center pl-6">
        <TextInput
          textAlignVertical="center"
          value={value ?? searchValue}
          onChangeText={onChangeText || (e => setSearchValue(e))}
          placeholder="Search..."
          className="overflow-hidden h-full text-base  pb-1 uppercase"
        />
      </View>
      <MagnifierButton
        onPress={() => onSearchPress && onSearchPress(searchValue)}
      />
    </View>
  );
}
