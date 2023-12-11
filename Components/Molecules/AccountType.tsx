import { View } from 'react-native';
import React from 'react';
import { ChoseOwnerRoleBtn } from '../Atoms/ChoseOwnerRoleBtn';
import { ChooseWorkerRoleBtn } from '../Atoms/chooseWorkerRoleBtn';
import { UserRoleMobiScreen } from '../../FrontendSelfTypes/RegisterMobi/RegisterScreensData';

export interface Props {
  onFlag: UserRoleMobiScreen;
  setOnFlag: React.Dispatch<React.SetStateAction<UserRoleMobiScreen>>;
}
export function AccountType({ onFlag, setOnFlag }: Props) {
  return (
    <View className="flex w-max flex-row h-1/6" testID="account-type">
      <ChoseOwnerRoleBtn onFlag={onFlag} setOnFlag={setOnFlag} />
      <ChooseWorkerRoleBtn onFlag={onFlag} setOnFlag={setOnFlag} />
    </View>
  );
}
