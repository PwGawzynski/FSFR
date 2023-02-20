import { LayoutAnimation, Platform, UIManager, View } from 'react-native';
import React, { useState } from 'react';
import { LogoImage } from '../Atoms/LogoImage';
import { InfoText } from '../Atoms/InfoText';
import { AppInput } from '../Molecules/AppInput';
import { AuthCodeData } from '../../frontendSelfTypes/moduleProps/AuthCodeData';
import { AppButton } from '../Atoms/AppButton';

const codeSplitter = (code: string): string => {
  const clearStr = code.replace(/\s+/g, '');
  const first = clearStr.substring(0, 3);
  const last = clearStr.substring(3, 6);
  return last ? `${first}   ${last}` : `${first}`;
};
export function AuthCode() {
  const [data, setData] = useState({ code: '' } as AuthCodeData);
  const [isInputFocused, setInputFocused] = useState(false as boolean);
  return (
    <View className="w-screen h-screen bg-white items-center flex-1">
      <LogoImage />
      <InfoText additionalStyles="w-10/12 text-base mb-12 mt-24">
        We’ve sent you e-mail message on given address, please click on link
        inside it, to activate your account. This action is crucial to achieve
        safety for your data. After activation we will sent you sms message with
        special code, to confirm phone number, please TYPE CODE FROM THIS
        MESSAGE BELOW{' '}
      </InfoText>
      <AppInput
        onFocus={() => {
          if (
            Platform.OS === 'android' &&
            UIManager.setLayoutAnimationEnabledExperimental
          ) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
          }
          LayoutAnimation.easeInEaseOut();
          setInputFocused(true);
        }}
        onDeFocus={() => setInputFocused(false)}
        maxLength={9}
        keyboardType="number-pad"
        setter={setData}
        ObjectKey="code"
        value={`${codeSplitter(data.code)}`}
        additionalStyles="w-1/2"
        additionalTextStyles="text-center text-3xl tracking-widest"
      />
      <View
        className={`w-full  items-center flex-1 ${
          isInputFocused ? 'justify-start' : 'justify-end'
        }`}
      >
        <AppButton
          additionalStyles="w-9/12 mb-20 mt-4"
          action={() => console.log('Submit code')}
          context="confirm"
        />
      </View>
    </View>
  );
}
