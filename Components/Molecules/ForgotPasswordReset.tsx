import { View } from 'react-native';
import React from 'react';
import { InfoText } from '../Atoms/InfoText';
import { AppButton } from '../Atoms/AppButton';
import { ForgotPasswordProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function ForgotPasswordReset({
  navigation,
  ats,
  btnStyles,
  abs,
}: ForgotPasswordProps) {
  return (
    <View className={`w-full items-center ${abs}`}>
      <InfoText abs={`mt-10 ${ats}`}>
        FORGOT YOUR PASSWORD ? DON’T WORRY, CLICK RESET PASSWORD BUTTON BELLOW{' '}
      </InfoText>
      <AppButton
        action={() => {
          navigation.navigate('ResetPassword');
        }}
        context="Reset Password"
        abs={`mt-10 ${btnStyles}`}
      />
    </View>
  );
}
