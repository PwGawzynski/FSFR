import { View } from 'react-native';
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { InfoText } from '../Atoms/InfoText';
import { AppButton } from '../Atoms/AppButton';
import { LoginStackParamList } from '../../App';

type Props = Omit<StackScreenProps<LoginStackParamList>, 'route'>;

export function ForgotPasswordReset({ navigation }: Props) {
  return (
    <View className="w-full">
      <InfoText additionalStyles="mt-10">
        FORGOT YOUR PASSWORD ? DON’T WORRY, CLICK RESET PASSWORD BUTTON BELLOW{' '}
      </InfoText>
      <AppButton
        action={() => {
          navigation.navigate('ResetPassword');
        }}
        context="Reset Password"
        additionalStyles="mt-10"
      />
    </View>
  );
}
