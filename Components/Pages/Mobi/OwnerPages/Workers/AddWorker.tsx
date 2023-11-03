import { SafeAreaView, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, {
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScreenTitleHeader } from '../../../../Atoms/ScreenTitleHeader';
import { AppInput } from '../../../../Molecules/AppInput';
import {
  NewWorker,
  NewWorkerSign,
  WorkerPosition,
  WorkerStatus,
} from '../../../../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { getFontScaledSize } from '../../../../../helpers/style/fontSize';
import { AppEnumBasedPickerInput } from '../../../../Atoms/AppEnumBasedPickerInput';
import { SmallHeader } from '../../../../Molecules/SmallHeader';
import { OwnerWorkersMaterialRootProps } from '../../../../../FrontendSelfTypes/navigation/types';
import Plus from '../../../../../assets/plus.svg';

const INIT_WORKER: NewWorker = {
  county: '',
  email: '',
  surname: '',
  name: '',
  phone: '',
  province: '',
  address: '',
  dateOfBirth: '',
  status: WorkerStatus.Active,
  photoUrl: '',
  position: WorkerPosition.Operator,
};

const INIT_PROFILE_SIGN: NewWorkerSign = {
  name: '',
  surname: '',
};

const ANIMATION_DELAY = 500;
const ANIMATION_DURATION = 1000;

export function AddWorker({
  route,
  navigation,
}: OwnerWorkersMaterialRootProps<'addWorker', 'workersRoot', 'workers'>) {
  const opacity = useSharedValue(0);
  const imgUri = route.params?.imgUri;

  const [newWorker, setNewWorker] = useState<NewWorker>(INIT_WORKER);
  const [profileSign, setProfileSign] =
    useState<NewWorkerSign>(INIT_PROFILE_SIGN);

  console.log(newWorker);
  const handleSetProfileName = () =>
    setProfileSign(prevState => ({
      ...prevState,
      name: newWorker.name,
    }));

  const handleSetProfileSurname = () =>
    setProfileSign(prevState => ({
      ...prevState,
      surname: newWorker.surname,
    }));

  const handleSetWorkerPosition = (v: unknown, i: number) =>
    setNewWorker(prevState => ({ ...prevState, position: i }));
  const handleSetWorkerStatus = (v: unknown, i: number) =>
    setNewWorker(prevState => ({ ...prevState, status: i }));

  const handleProfileSignAnimation = () => {
    if (profileSign.name.length && profileSign.surname.length)
      opacity.value = withDelay(
        ANIMATION_DELAY,
        withTiming(1, { duration: ANIMATION_DURATION }),
      );
    else opacity.value = 0;
  };

  useEffect(() => handleProfileSignAnimation(), [profileSign]);

  return (
    <SafeAreaView className="w-full h-full flex flex-col">
      <View className="ml-4 mr-4 flex-1 flex flex-col justify-between">
        <ScreenTitleHeader variant="lg">Add New Worker</ScreenTitleHeader>
        <View className="flex flex-col items-center justify-center">
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('takePhoto', {
                onSuccessRedirectionLink: 'addWorker',
              })
            }
            className="h-48 w-48 mt-6 mb-6 bg-[#848484] rounded-lg flex-col items-center justify-center overflow-hidden"
          >
            {imgUri ? (
              <Image
                source={{
                  uri: imgUri,
                }}
                className="h-full w-full"
              />
            ) : (
              <Plus fill="#fff" width={48} height={48} />
            )}
          </TouchableOpacity>
        </View>
        <KeyboardAwareScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
        >
          <AppInput
            onDeFocus={handleSetProfileName}
            setter={setNewWorker}
            ObjectKey="name"
            value={newWorker.name}
            underlyingLabel="Name"
          />
          <AppInput
            onDeFocus={handleSetProfileSurname}
            setter={setNewWorker}
            ObjectKey="surname"
            value={newWorker.surname}
            underlyingLabel="Surname"
          />
          <AppInput
            setter={setNewWorker}
            ObjectKey="phone"
            value={newWorker.phone}
            underlyingLabel="Phone"
            keyboardType="phone-pad"
          />
          <AppInput
            setter={setNewWorker}
            ObjectKey="email"
            value={newWorker.email}
            underlyingLabel="E-mail"
            keyboardType="email-address"
          />
          <AppEnumBasedPickerInput
            onChange={handleSetWorkerPosition}
            enumName={WorkerPosition}
          />
          <AppEnumBasedPickerInput
            onChange={handleSetWorkerStatus}
            enumName={WorkerStatus}
          />
          <SmallHeader abs="mt-14">Address DAta</SmallHeader>
          <AppInput
            setter={setNewWorker}
            ObjectKey="address"
            value={newWorker.address}
            underlyingLabel="Address ( house number, street )"
            keyboardType="default"
          />
          <AppInput
            setter={setNewWorker}
            ObjectKey="county"
            value={newWorker.county}
            underlyingLabel="County"
            keyboardType="default"
          />
          <AppInput
            setter={setNewWorker}
            ObjectKey="province"
            value={newWorker.province}
            underlyingLabel="Province"
            keyboardType="default"
          />
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}
