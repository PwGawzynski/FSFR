import { Text, View } from 'react-native';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';
import CheckIco from '../../assets/check.svg';
import GearsIco from '../../assets/gears.svg';
import WarnIco from '../../assets/warning.svg';
import {
  EventType,
  NotificationProps,
} from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { UserRole } from '../../FarmServiceTypes/User/RegisterNewUserDataDtoInterfaceMobi';

export function Notification({
  causer,
  causerRole,
  message,
  rightBottomSign,
  eventType,
  id,
}: NotificationProps) {
  const visible = useSharedValue(0);
  useEffect(() => {
    if (!visible.value) visible.value = withTiming(1, { duration: 600 });
  }, []);

  return (
    <Animated.View
      className="flex-1 h-20 mb-8"
      style={[
        {
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderStyle: 'solid',
          borderColor: '#000',
        },
        { opacity: visible },
      ]}
      key={id}
    >
      <View className="h-6 bg-black absolute top-[-12] justify-center">
        <Text className="text-white text-sm font-bold uppercase pl-2 pr-2 text-center">
          {(causerRole === UserRole.worker && 'worker') ||
            (causerRole === UserRole.owner && 'owner')}{' '}
          {causer}
        </Text>
      </View>
      <View className="h-6 w-6 bg-black absolute top-[-12] right-0 justify-center">
        {eventType === EventType.Check && <CheckIco color="#4CFA72" />}
        {eventType === EventType.Action && <GearsIco fill="#fff" />}
        {eventType === EventType.Warning && <WarnIco fill="#f00" />}
      </View>
      <View className="flex-1 items-center justify-center ">
        <Text>{message}</Text>
      </View>
      <View className="absolute w-full top-[60] items-center justify-center s">
        <Text className="w-full text-right pr-4">{rightBottomSign}</Text>
      </View>
    </Animated.View>
  );
}
