import { View } from 'react-native';
import React from 'react';
import { InfoText } from '../Atoms/InfoText';
import { AppButton } from '../Atoms/AppButton';
import { RegisterAskProps } from '../../frontendSelfTypes/moduleProps/RegisterAskProps';

export function RegisterAsk({ navigation }: RegisterAskProps) {
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
