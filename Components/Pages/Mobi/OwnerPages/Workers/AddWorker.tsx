import { SafeAreaView, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, {
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { ActivityIndicator } from 'react-native-paper';
import { ScreenTitleHeader } from '../../../../Atoms/ScreenTitleHeader';
import { NewWorkerSign } from '../../../../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { getFontScaledSize } from '../../../../../helpers/style/fontSize';
import { OwnerWorkersMaterialRootProps } from '../../../../../FrontendSelfTypes/navigation/types';
import Plus from '../../../../../assets/plus.svg';
import NewWorkerForm from '../../../../Organisms/NewWorkerForm';

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

  const [profileSign, setProfileSign] =
    useState<NewWorkerSign>(INIT_PROFILE_SIGN);

  const [isFormPending, setFormPending] = useState(false);

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
        <View className="flex-row items-center justify-between">
          <ScreenTitleHeader variant="lg">Add New Worker</ScreenTitleHeader>
          {isFormPending && <ActivityIndicator size={32} color="#279840" />}
        </View>
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
          <Animated.Text
            adjustsFontSizeToFit
            numberOfLines={1}
            className="text-center font-semibold"
            style={{ fontSize: getFontScaledSize(24), opacity }}
          >
            {profileSign.name &&
              profileSign.surname &&
              `${profileSign.name} ${profileSign.surname}`}
          </Animated.Text>
        </View>
        <NewWorkerForm
          navigation={navigation}
          setLoadingIndicator={setFormPending}
          setProfileSign={setProfileSign}
          profilePhotoUrl={imgUri}
        />
      </View>
    </SafeAreaView>
  );
}
