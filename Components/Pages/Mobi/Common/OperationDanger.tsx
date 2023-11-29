import { SafeAreaView, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Sound } from 'expo-av/build/Audio/Sound';
import { Audio } from 'expo-av';
import { AppButton } from '../../../Atoms/AppButton';
import { DangerAlarmIcon } from '../../../Molecules/DangerAlarmIcon';
import { ContainerWCenteredLinedText } from '../../../Atoms/ContainerWCenteredLinedText';

export function OperationDanger({ route, navigation }: any) {
  const { shownMessage, afterDangerScreenName, dangerButtonSign } =
    route.params;

  const [warningSound, setWarningSound] = useState<Sound | undefined>();
  useEffect(() => {
    if (!warningSound) {
      (async () => {
        const { sound } = await Audio.Sound.createAsync(
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          require('../../../../assets/error.mp3'),
        );
        setWarningSound(sound);
      })();
    }
  }, []);
  useEffect(() => {
    warningSound?.playAsync();
    return warningSound
      ? () => {
          warningSound.unloadAsync();
        }
      : undefined;
  }, [warningSound]);

  return (
    <SafeAreaView className="flex h-full flex-col items-center justify-center ml-6 mr-6">
      <View className="h-1/3 w-full">
        <DangerAlarmIcon />
      </View>
      <View className="h-1/3 w-full">
        <ContainerWCenteredLinedText messages={shownMessage} />
      </View>
      <View className="h-1/3 items-center w-full justify-between flex-row">
        <AppButton
          action={() => navigation.goBack()}
          context="back"
          abs="w-2/5 bg-[#279840]"
        />
        <AppButton
          action={() => navigation.navigate(afterDangerScreenName as unknown)}
          context={dangerButtonSign || 'CONFIRM'}
          abs="w-2/5 bg-[#f00]"
        />
      </View>
    </SafeAreaView>
  );
}
