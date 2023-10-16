import { View } from 'react-native';
import React from 'react';
import { InfoText } from '../Atoms/InfoText';
import { AppButton } from '../Atoms/AppButton';
import { RegisterAskProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function RegisterAsk({
  navigation,
  ats,
  abs,
  additionalBtnStyles,
}: RegisterAskProps) {
  return (
    <View className={`w-full items-center ${abs}`}>
      <InfoText abs={`mt-10 ${ats}`}>
        {`DON'T YOU HAVE AN ACCOUNT ? RELAX CLICK BELLOW AND CREATE ONE`}
      </InfoText>
      <AppButton
        action={() => {
          navigation.navigate('Register');
        }}
        context="Register"
        abs={`mt-10 ${additionalBtnStyles}`}
      />
    </View>
  );
}
