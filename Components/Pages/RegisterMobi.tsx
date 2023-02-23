import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RegisterStackParamList } from '../../frontendSelfTypes/NavigatorsInterfaces/RegisterStack';
import { EmailAndPassword } from './EmailAndPassword';

export function RegisterMobi() {
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
    </RegisterStack.Navigator>
  );
}
