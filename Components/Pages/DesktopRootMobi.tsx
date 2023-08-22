import { SafeAreaView, Text, View } from 'react-native';
import { AppButton } from '../Atoms/AppButton';

export function DesktopRootMobi({ navigation }: any) {
  return (
    <SafeAreaView>
      <Text>RootDesktop</Text>
      <View className="flex flex-row">
        <AppButton
          additionalStyles="flex-1 m-2"
          action={() => navigation.navigate('orders')}
          context="Orders"
        />
        <AppButton
          additionalStyles="flex-1 m-2"
          action={() => navigation.navigate('workers')}
          context="Workers"
        />
      </View>
    </SafeAreaView>
  );
}
