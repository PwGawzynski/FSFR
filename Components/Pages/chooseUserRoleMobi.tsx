import { View } from 'react-native';
import { useEffect, useState } from 'react';
import { LogoImageCurtain } from '../Atoms/LogoImageCurtain';
import { AppButton } from '../Atoms/AppButton';
import { AccountType } from '../Molecules/AccountType';
import { BigBoldText } from '../Molecules/BigBoldText';
import {
  handleRestoreData,
  handleSaveDataMerge,
} from '../../helpers/handlers/AsyncStoreHelpers';
import { UserRoleMobiScreen } from '../../FrontendSelfTypes/RegisterMobi/RegisterScreensData';
import { RegisterMobiPropsBase } from '../../FrontendSelfTypes/navigation/types';

export function ChooseUserRoleMobi({
  navigation,
}: RegisterMobiPropsBase<'ChooseUserRole'>) {
  const [onFlag, setOnFlag] = useState({
    worker: true,
    owner: false,
  } as UserRoleMobiScreen);

  useEffect(() => {
    (async () => {
      await handleRestoreData('RegisterMobiUserRole', setOnFlag);
    })();
  }, []);

  return (
    <View className="bg-white w-full h-full items-center">
      <LogoImageCurtain />
      <BigBoldText additionalStyles="pl-5 mt-4 mb-4">
        CHOOSE YOUR ROLE:
      </BigBoldText>
      <AccountType onFlag={onFlag} setOnFlag={setOnFlag} />
      <AppButton
        action={() => {
          handleSaveDataMerge(
            'RegisterMobiUserRole',
            onFlag,
            navigation,
            'PersonalData',
          );
        }}
        context="Next"
        abs="w-11/12  mt-10"
      />
    </View>
  );
}
