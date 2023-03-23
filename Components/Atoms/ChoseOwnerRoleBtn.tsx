import { Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import FarmerRoleIco from '../../assets/user.svg';
import { UserRoleMobiScreen } from '../../FrontendSelfTypes/RegisterMobi/RegisterScreensData';

export interface Props {
  onFlag: UserRoleMobiScreen;
  setOnFlag: React.Dispatch<React.SetStateAction<UserRoleMobiScreen>>;
}

export function ChoseOwnerRoleBtn({ setOnFlag, onFlag }: Props) {
  const [color, setColor] = useState('white');
  useEffect(() => {
    console.log('REl Own');
    console.log(onFlag);
    if (onFlag.worker) setColor('white');
    else setColor('black');
  }, [onFlag]);
  return (
    <TouchableOpacity
      onPress={() => {
        setOnFlag(() => ({
          worker: !onFlag.worker,
          owner: !onFlag.owner,
        }));
      }}
      className={`flex-1  bg-${color} items-center justify-center
      rounded-lg m-3 border-solid border-black border shadow-sm shadow-gray-800`}
    >
      <FarmerRoleIco fill={`${color === 'white' ? '#000' : '#fff'}`} />
      <Text
        className={`text-${
          color === 'white' ? 'black' : 'white'
        } text-lg uppercase font-medium`}
      >
        Owner
      </Text>
    </TouchableOpacity>
  );
}
