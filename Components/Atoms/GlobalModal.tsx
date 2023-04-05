import Modal from 'react-native-modal';
import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppSettings, ModalState } from '../../helpers/appSettings/contexts';
import { AppButton } from './AppButton';
import { RegisterMobiNavigation } from '../../FrontendSelfTypes/navigation/types';

export function GlobalModal() {
  const appContext = useContext(AppSettings).settings;
  const appSetters = useContext(AppSettings).setters;

  const navigation = useNavigation<RegisterMobiNavigation<'Login'>>();

  const { modalContext } = appContext;
  const { setModalContext } = appSetters;
  return (
    <Modal isVisible={modalContext.isOn === ModalState.on}>
      <View className="bg-white p-10 items-center rounded-lg">
        <Text className="font-xl uppercase text-center text-black">
          {modalContext.context}
        </Text>
        <AppButton
          action={() => ({})}
          context="Confirm"
          additionalStyles="mt-10"
        />
        <AppButton
          action={() => {
            navigation.navigate('Register');
            setModalContext({
              isOn: ModalState.off,
              context: undefined,
            });
          }}
          context="Go Back"
          additionalStyles="mt-6"
        />
      </View>
    </Modal>
  );
}
