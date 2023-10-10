import { ActivityIndicator } from 'react-native-paper';
import { Text, View } from 'react-native';
import React from 'react';

export function LoadingAnimation() {
  return (
    <View className="flex-1 flex-col items-center justify-center">
      <ActivityIndicator size={60} color="#279840" animating />
      <Text className="text-lg text-center mt-4 text-[#848484]">
        Fetching data...
      </Text>
    </View>
  );
}
