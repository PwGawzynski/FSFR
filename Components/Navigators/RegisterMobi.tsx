import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RegisterStackParamList } from '../../FrontendSelfTypes/NavigatorsInterfaces/RegisterStack';
import { EmailAndPassword } from '../Pages/EmailAndPassword';
import { RegisterMobiBase } from '../../FrontendSelfTypes/navigation/types';
import { PersonalData } from '../Pages/PersonalData';
import { ContactPhones } from '../Pages/ContactPhones';
import { AddressesData } from '../Pages/AddressesData';
import { AddressDataCdnMobi } from '../Pages/AddressDataCdnMobi';
import { ChooseUserRoleMobi } from '../Pages/chooseUserRoleMobi';
import { OperationConfirmedAnimation } from '../Pages/Mobi/Common/OperationConfirmedAnimation';
import { CreateCompany, CreateCompanyI } from '../Pages/CreateCompany';

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
        name="OperationConfirmed"
        component={OperationConfirmedAnimation}
        options={{
          gestureDirection: 'vertical',
          headerShown: false,
        }}
      />
      <RegisterStack.Screen
        name="EmailAndPassword"
        component={EmailAndPassword}
      />
      <RegisterStack.Screen name="PersonalData" component={PersonalData} />

      <RegisterStack.Screen name="ContactPhones" component={ContactPhones} />
      <RegisterStack.Screen name="Addresses" component={AddressesData} />
      <RegisterStack.Screen
        name="AddressesCdn"
        component={AddressDataCdnMobi}
      />
      <RegisterStack.Screen
        name="ChooseUserRole"
        component={ChooseUserRoleMobi}
      />
    </RegisterStack.Navigator>
  );
}
