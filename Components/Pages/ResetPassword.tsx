import {
  LayoutAnimation,
  Platform,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { LogoImageCurtain } from '../Atoms/LogoImageCurtain';
import { InfoText } from '../Atoms/InfoText';
import { AppButton } from '../Atoms/AppButton';
import { AppInput } from '../Molecules/AppInput';

export function ResetPassword() {
  const [data, setData] = useState({ email: '' } as any);
  const [isInputFocused, setInputFocused] = useState(false as boolean);
  const inputRef = React.createRef<TextInput>();
  return (
    <TouchableOpacity
      activeOpacity={1}
      className="w-screen h-screen bg-white items-center"
      onPress={() => inputRef.current?.blur()}
    >
      <LogoImageCurtain />
      <InfoText additionalStyles="w-9/12 mt-24">
        ENTER YOUR ACCOUNT E-MAIL ADDRESS OR NIP OR USER NAME AND WE WILL SEND
        YOU MAIL WITH LINK TO RESET YOUR PASSWORD
      </InfoText>
      <AppInput
        refGetter={inputRef}
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
        additionalStyles="w-9/12 mt-10"
        setter={setData}
        ObjectKey="email"
        value={data.email}
        underlyingLabel="UserName or NIP or E-mail"
      />
      <View
        className={`w-full  items-center flex-1 ${
          isInputFocused ? 'justify-start' : 'justify-end'
        }`}
      >
        <AppButton
          additionalStyles="w-9/12 mb-28 mt-20"
          action={() => console.log('Reset password')}
          context="Reset your password"
        />
      </View>
    </TouchableOpacity>
  );
}
