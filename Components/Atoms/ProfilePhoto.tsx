import { Image, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import { ProfilePhotoProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import UserSvg from '../../assets/user.svg';

export function ProfilePhoto({
  resizeMode,
  additionalImageStyles,
  abs,
  imgLink,
  focused,
}: ProfilePhotoProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const opacity = useSharedValue(1);
  const DURATION = 400;
  useEffect(() => {
    if (!isLoading) opacity.value = withTiming(0, { duration: DURATION });
  }, [isLoading]);
  return (
    <View
      className={`w-8 h-8 rounded-full overflow-hidden items-center justify-center ${
        focused && 'border-solid border-[#279840] border-4'
      } ${abs}`}
    >
      {imgLink && (
        <View style={[{ width: '100%', height: '100%' }]}>
          <Image
            onLoadEnd={() => setIsLoading(false)}
            loadingIndicatorSource={require('../../assets/blankUser.png')}
            resizeMode={resizeMode || 'cover'}
            className={`items-center justify-center w-full h-full${additionalImageStyles}`}
            source={{
              uri: imgLink,
            }}
            style={[{ width: '100%', height: '100%' }]}
          />
        </View>
      )}
      <Animated.View
        style={[
          { width: '100%', height: '100%', position: 'absolute' },
          { opacity },
        ]}
        className="w-full h-full bg-gray-300 items-center justify-center "
      >
        <View className="items-center justify-center">
          <UserSvg fill="#000" width={24} height={24} />
        </View>
      </Animated.View>
    </View>
  );
}
