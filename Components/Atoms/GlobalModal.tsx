import Modal from 'react-native-modal';
import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { AppSettings, ModalState } from '../../helpers/appSettings/contexts';
import { AppButton } from './AppButton';

export function GlobalModal() {
  const appContext = useContext(AppSettings).settings;
  const appSetters = useContext(AppSettings).setters;

  const { modalContext } = appContext;
  const { setModalContext } = appSetters;

  return (
    <Modal
      isVisible={modalContext.isOn === ModalState.on}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <View className="bg-white p-10 items-center rounded-lg">
        <Text className="font-xl uppercase text-center text-black">
          {modalContext.context}
        </Text>
        <AppButton
          action={() => {
            if (modalContext.onDisapproveCallback)
              modalContext.onDisapproveCallback();
            setModalContext({
              isOn: ModalState.off,
              context: undefined,
            });
          }}
          context="Confirm"
          additionalStyles="mt-10"
        />
        <AppButton
          action={() => {
            if (modalContext.onApproveCallback)
              modalContext.onApproveCallback();
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
