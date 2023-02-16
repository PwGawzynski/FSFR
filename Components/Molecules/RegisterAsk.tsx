import { View } from 'react-native';
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { InfoText } from '../Atoms/InfoText';
import { AppButton } from '../Atoms/AppButton';
import { LoginStackParamList } from '../../App';

type Props = Omit<StackScreenProps<LoginStackParamList>, 'route'>;

export function RegisterAsk({ navigation }: Props) {
  return (
    <View className="w-full">
      <InfoText additionalStyles="mt-10">
        {`DON'T YOU HAVE AN ACCOUNT ? RELAX CLICK BELLOW AND CREATE ONE`}
      </InfoText>
      <AppButton
        action={() => {
          navigation.navigate('Register');
        }}
        context="Register"
        additionalStyles="mt-10"
      />
    </View>
  );
}
