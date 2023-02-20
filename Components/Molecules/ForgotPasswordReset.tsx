import { View } from 'react-native';
import React from 'react';
import { InfoText } from '../Atoms/InfoText';
import { AppButton } from '../Atoms/AppButton';
import { ForgotPasswordProps } from '../../frontendSelfTypes/moduleProps/ForgotPasswordProps';

export function ForgotPasswordReset({
  navigation,
  additionalStyles,
  additionalBtnStyles,
}: ForgotPasswordProps) {
  return (
    <View className="w-full items-center">
      <InfoText additionalStyles={`mt-10 ${additionalStyles}`}>
        FORGOT YOUR PASSWORD ? DON’T WORRY, CLICK RESET PASSWORD BUTTON BELLOW{' '}
      </InfoText>
      <AppButton
        action={() => {
          navigation.navigate('ResetPassword');
        }}
        context="Reset Password"
        additionalStyles={`mt-10 ${additionalBtnStyles}`}
      />
    </View>
  );
}
