import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AppInput } from '../Molecules/AppInput';
import { AppButton } from '../Atoms/AppButton';

export interface RegisterDataAsk {
  email: string;
  password: string;
  name: string;
  surname: string;
  companyName: string;
  nip: string;
  contactPhone: string;
  companyCompactPhone: string;
  city: string;
  postalCode: string;
  houseNumber: string;
  circumference: string;
}

export function RegisterForm() {
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
  } as RegisterDataAsk);

  return (
    <KeyboardAwareScrollView
      className="w-8/12 mt-8"
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled
      extraHeight={450}
      showsVerticalScrollIndicator={false}
    >
      <AppInput
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
        underlyingLabel="Name"
        ObjectKey="name"
        value={data.name}
        inputMode="givenName"
        autoComplete="name-given"
        additionalStyles="mt-5"
      />
      <AppInput
        setter={setData}
        underlyingLabel="Surname"
        ObjectKey="surname"
        value={data.surname}
        autoComplete="name-middle"
        additionalStyles="mt-5"
      />
      <AppInput
        setter={setData}
        underlyingLabel="CompanyName"
        ObjectKey="companyName"
        value={data.companyName}
        additionalStyles="mt-5"
      />
      <AppInput
        setter={setData}
        underlyingLabel="NIP"
        ObjectKey="nip"
        value={data.nip}
        additionalStyles="mt-5"
        keyboardType="number-pad"
      />
      <AppInput
        setter={setData}
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
        underlyingLabel="City"
        ObjectKey="city"
        value={data.city}
        inputMode="addressCity"
        autoComplete="street-address"
        additionalStyles="mt-5"
      />
      <AppInput
        setter={setData}
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
        action={() => console.log('REGISTER')}
        context="Register"
        additionalStyles="mt-5"
      />
    </KeyboardAwareScrollView>
  );
}
