import { ActivityIndicator } from 'react-native-paper';
import { Text, View } from 'react-native';
import React from 'react';

interface Props {
  customText?: string;
}
export function LoadingAnimation({ customText }: Props) {
  return (
    <View className="flex-1 flex-col items-center justify-center">
      <ActivityIndicator size={60} color="#279840" animating />
      <Text className="text-lg text-center mt-4 text-[#848484]">
        {customText || 'Fetching data...'}
      </Text>
    </View>
  );
}
