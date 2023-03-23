import { Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import FarmerRoleIco from '../../assets/user.svg';
import { UserRoleMobiScreen } from '../../FrontendSelfTypes/RegisterMobi/RegisterScreensData';

export interface Props {
  onFlag: UserRoleMobiScreen;
  setOnFlag: React.Dispatch<React.SetStateAction<UserRoleMobiScreen>>;
}

export function ChooseWorkerRoleBtn({ setOnFlag, onFlag }: Props) {
  const [color, setColor] = useState('white');
  useEffect(() => {
    console.log('rel Wor');
    console.log(onFlag);
    if (onFlag.owner) setColor('white');
    else setColor('black');
  }, [onFlag]);
  return (
    <TouchableOpacity
      onPress={() => {
        console.log(onFlag);
        setOnFlag(() => ({
          owner: !onFlag.owner,
          worker: !onFlag.worker,
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
        Worker
      </Text>
    </TouchableOpacity>
  );
}
