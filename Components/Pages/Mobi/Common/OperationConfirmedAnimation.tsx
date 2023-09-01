import { SafeAreaView, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import CheckIco from '../../../../assets/check.svg';
import { OwnerMobiDesktopRootStackProps } from '../../../../FrontendSelfTypes/navigation/types';

export function OperationConfirmedAnimation({
  navigation,
  route,
}: OwnerMobiDesktopRootStackProps<'OperationConfirmed'>) {
  const { shownMessage, redirectScreenName } = route.params;
  const opacity = useSharedValue(0);
  const [animationStart, setAnimationStart] = useState(false);

  useEffect(() => {
    const intervalId = setTimeout(() => setAnimationStart(true), 1000);
    const interval2Id = setTimeout(
      () => navigation.navigate(redirectScreenName as any),
      2500,
    );
    return () => {
      clearInterval(intervalId);
      clearInterval(interval2Id);
    };
  }, []);
  useEffect(() => {
    opacity.value = withSpring(1);
  }, [animationStart]);
  return (
    <View className="w-full h-full">
      <SafeAreaView className="w-full h-full items-center justify-center flex flex-col">
        <Animated.View
          style={{
            opacity: opacity.value,
            overflow: 'hidden',
            flexGrow: 1,
            justifyContent: 'flex-end',
          }}
        >
          <CheckIco
            color="#000"
            style={{
              minWidth: 100,
              minHeight: 100,
            }}
          />
        </Animated.View>
        <View className="flex-1 w-full mt-4">
          <Text className="w-max text-lg text-center font-bold uppercase">
            {shownMessage}
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
