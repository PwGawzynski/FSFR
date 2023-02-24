import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RegisterStackParamList } from '../../frontendSelfTypes/NavigatorsInterfaces/RegisterStack';
import { EmailAndPassword } from './EmailAndPassword';
import { RegisterMobiBase } from '../../frontendSelfTypes/navigation/types';
import { PersonalData } from './PersonalData';
import { CompanyNameAndNip } from './CompanyNameAndNip';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function RegisterMobi({ navigation }: RegisterMobiBase) {
  const RegisterStack = createStackNavigator<RegisterStackParamList>();
  return (
    <RegisterStack.Navigator
      initialRouteName="EmailAndPassword"
      screenOptions={{
        headerShown: false,
      }}
    >
      <RegisterStack.Screen
        name="EmailAndPassword"
        component={EmailAndPassword}
      />
      <RegisterStack.Screen name="PersonalData" component={PersonalData} />
      <RegisterStack.Screen
        name="CompanyNameAndNip"
        component={CompanyNameAndNip}
      />
    </RegisterStack.Navigator>
  );
}
