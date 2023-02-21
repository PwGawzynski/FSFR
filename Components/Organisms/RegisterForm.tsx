import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from 'react-native';
import { AppInput } from '../Molecules/AppInput';
import { AppButton } from '../Atoms/AppButton';
import { RegisterDataObject } from '../../../farm-service-be/types/Useer/RegisterDataObject';
import { RegisterFormProps } from '../../frontendSelfTypes/moduleProps/ComponentsProps';

export function RegisterForm({ navigation }: RegisterFormProps) {
  const input1 = React.createRef<TextInput>();
  const input2 = React.createRef<TextInput>();
  const input3 = React.createRef<TextInput>();
  const input4 = React.createRef<TextInput>();
  const input5 = React.createRef<TextInput>();
  const input6 = React.createRef<TextInput>();
  const input7 = React.createRef<TextInput>();
  const input9 = React.createRef<TextInput>();
  const input10 = React.createRef<TextInput>();
  const [data, setData] = useState({
    email: '',
    password: '',
    name: '',
    surname: '',
    companyName: '',
    nip: '',
    contactPhone: '',
    companyCompactPhone: '',
    city: '',
    postalCode: '',
    houseNumber: '',
    circumference: '',
  } as RegisterDataObject);
  return (
    <KeyboardAwareScrollView
      className="w-8/12 pt-10"
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled
      enableResetScrollToCoords={false}
      extraHeight={450}
      showsVerticalScrollIndicator={false}
    >
      <AppInput
        refGetter={input1}
        onSubmit={() => input2.current?.focus()}
        setter={setData}
        underlyingLabel="Email"
        ObjectKey="email"
        value={data.email}
        inputMode="emailAddress"
        autoComplete="email"
        keyboardType="email-address"
      />
      <AppInput
        setter={setData}
        refGetter={input2}
        onSubmit={() => {
          input3.current?.focus();
        }}
        underlyingLabel="Password"
        ObjectKey="password"
        value={data.password}
        inputMode="password"
        autoComplete="password"
        additionalStyles="mt-5"
        isPwd
      />
      <AppInput
        setter={setData}
        refGetter={input3}
        onSubmit={() => input4.current?.focus()}
        underlyingLabel="Name"
        ObjectKey="name"
        value={data.name}
        inputMode="givenName"
        autoComplete="name-given"
        additionalStyles="mt-5"
      />
      <AppInput
        setter={setData}
        refGetter={input4}
        onSubmit={() => input5.current?.focus()}
        underlyingLabel="Surname"
        ObjectKey="surname"
        value={data.surname}
        autoComplete="name-middle"
        additionalStyles="mt-5"
      />
      <AppInput
        setter={setData}
        refGetter={input5}
        onSubmit={() => input6.current?.focus()}
        underlyingLabel="CompanyName"
        ObjectKey="companyName"
        value={data.companyName}
        additionalStyles="mt-5"
      />
      <AppInput
        refGetter={input6}
        onSubmit={() => input7.current?.focus()}
        setter={setData}
        underlyingLabel="NIP"
        ObjectKey="nip"
        value={data.nip}
        additionalStyles="mt-5"
        keyboardType="number-pad"
      />
      <AppInput
        setter={setData}
        refGetter={input7}
        underlyingLabel="Your Contact Phone"
        ObjectKey="contactPhone"
        autoComplete="tel"
        value={data.contactPhone}
        additionalStyles="mt-5"
        keyboardType="phone-pad"
      />
      <AppInput
        setter={setData}
        underlyingLabel="Company Contact Phone"
        ObjectKey="companyCompactPhone"
        value={data.companyCompactPhone}
        autoComplete="tel"
        additionalStyles="mt-5"
        keyboardType="phone-pad"
      />
      <AppInput
        setter={setData}
        onSubmit={() => input9.current?.focus()}
        underlyingLabel="City"
        ObjectKey="city"
        value={data.city}
        inputMode="addressCity"
        autoComplete="street-address"
        additionalStyles="mt-5"
      />
      <AppInput
        setter={setData}
        refGetter={input9}
        onSubmit={() => input10.current?.focus()}
        underlyingLabel="Postal Code"
        ObjectKey="postalCode"
        value={data.postalCode}
        inputMode="postalCode"
        autoComplete="postal-code"
        additionalStyles="mt-5"
        keyboardType="numbers-and-punctuation"
      />
      <AppInput
        setter={setData}
        refGetter={input10}
        underlyingLabel="House Number"
        ObjectKey="houseNumber"
        value={data.houseNumber}
        additionalStyles="mt-5"
        keyboardType="number-pad"
      />
      <AppInput
        setter={setData}
        underlyingLabel="Circumference"
        ObjectKey="circumference"
        value={data.circumference}
        additionalStyles="mt-5"
      />
      <AppButton
        action={() => navigation.navigate('AuthCode')}
        context="Register"
        additionalStyles="mt-5 mb-24"
      />
    </KeyboardAwareScrollView>
  );
}
