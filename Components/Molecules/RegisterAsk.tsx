import { View } from 'react-native';
import React from 'react';
import { InfoText } from '../Atoms/InfoText';
import { AppButton } from '../Atoms/AppButton';
import { RegisterAskProps } from '../../frontendSelfTypes/moduleProps/ComponentsProps';

export function RegisterAsk({
  navigation,
  additionalTxtStyles,
  additionalStyles,
  additionalBtnStyles,
}: RegisterAskProps) {
  return (
    <View className={`w-full items-center ${additionalStyles}`}>
      <InfoText additionalStyles={`mt-10 ${additionalTxtStyles}`}>
        {`DON'T YOU HAVE AN ACCOUNT ? RELAX CLICK BELLOW AND CREATE ONE`}
      </InfoText>
      <AppButton
        action={() => {
          navigation.navigate('Register');
        }}
        context="Register"
        additionalStyles={`mt-10 ${additionalBtnStyles}`}
      />
    </View>
  );
}
