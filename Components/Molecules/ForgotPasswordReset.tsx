import { View } from 'react-native';
import React from 'react';
import { InfoText } from '../Atoms/InfoText';
import { AppButton } from '../Atoms/AppButton';
import { ForgotPasswordProps } from '../../frontendSelfTypes/moduleProps/ComponentsProps';

export function ForgotPasswordReset({
  navigation,
  additionalTxtStyles,
  additionalBtnStyles,
  additionalStyles,
}: ForgotPasswordProps) {
  return (
    <View className={`w-full items-center ${additionalStyles}`}>
      <InfoText additionalStyles={`mt-10 ${additionalTxtStyles}`}>
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
