import { View } from 'react-native';
import React from 'react';
import { ChoseOwnerRoleBtn } from '../Atoms/ChoseOwnerRoleBtn';
import { ChooseWorkerRoleBtn } from '../Atoms/chooseWorkerRoleBtn';
import { UserRole } from '../../FarmServiceTypes/User/RegisterNewUserDataDtoInterfaceMobi';

export interface Props {
  onFlag: UserRole;
  setOnFlag: React.Dispatch<React.SetStateAction<UserRole>>;
}
export function AccountType({ onFlag, setOnFlag }: Props) {
  return (
    <View className="flex w-max flex-row h-1/6">
      <ChoseOwnerRoleBtn onFlag={onFlag} setOnFlag={setOnFlag} />
      <ChooseWorkerRoleBtn onFlag={onFlag} setOnFlag={setOnFlag} />
    </View>
  );
}
