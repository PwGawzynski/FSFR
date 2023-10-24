import { Image, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import { SquaredProfilePictureProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function SquaredProfilePicture({
  abs,
  additionalImageStyles,
  imageLink,
}: SquaredProfilePictureProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const opacity = useSharedValue(1);
  const DURATION = 400;
  useEffect(() => {
    if (!isLoading) opacity.value = withTiming(0, { duration: DURATION });
  }, [isLoading]);
  return (
    <View
      className={`w-full flex flex-col items-center justify-center mt-6 ${abs}`}
    >
      <Animated.View className="w-48 h-48 rounded-lg overflow-hidden">
        <Image
          onLoadEnd={() => setIsLoading(false)}
          source={{
            uri: imageLink,
          }}
          style={[{ width: '100%', height: '100%' }, additionalImageStyles]}
        />
      </Animated.View>
      <Animated.View
        style={[{ position: 'absolute' }, { opacity }]}
        className="w-48 h-48 bg-[#848484] items-center justify-center rounded-lg "
      />
    </View>
  );
}
